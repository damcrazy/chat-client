import React, { useContext, useState,useEffect,useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "../contexts/ContactsProvider";
import { useSocket } from "./SocketProvider";
const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {



    const { contacts } = useContacts();
    const socket = useSocket();
    const [Conversations, setConversations] = useLocalStorage(
        "Conversations",
        []
    );
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

    function createConversations(recipients) {
        setConversations((prevConversations) => {
            return [...prevConversations, { recipients, messages: [] }];
        });
    }




    const formattedConversations = Conversations.map((conversation, index) => {
        // console.log('conversation',(conversation.recipients))
        // // if(conversation.recipients.hasOwnProperty('recipents')){
        // //     console.log('wtf')
        // //     conversation.messages[0].text=conversation.recipients.text;
        // //     conversation.messages[0].sender=conversation.recipients.sender;
        // //     conversation.recipients = conversation.recipients.recipents;
        // // }
        // console.log('conversation1',conversation)
        const recipients = conversation.recipients.map((recipient) => {
            const contact = contacts.find((contact) => {
                return contact.id === recipient;
            });
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        });
        const messages = conversation.messages.map(messages => 
 
            {
                const contact = contacts.find((contact) => {
                    return contact.id === messages.sender;
                });
                const name = (contact && contact.name) || messages.sender;
                const fromMe = id === messages.sender;
                return { ...messages, senderName:name,fromMe };
            })

        const selected = index === selectedConversationIndex
        return { ...conversation,messages, recipients, selected };
    });





    // const addMessageToConversation = useCallback((recipients, text, sender ) =>{
    //     console.log('recipients-',recipients)
    //     setConversations((prevConversations) => {
    //         let madeChange = false;
    //         const newMessage = { sender,text };
    //         const newConversations = prevConversations.map((conversation) => {
    //             if (arrayEquals(conversation.recipients,recipients )) {
    //                 madeChange = true;
    //                 return {
    //                     ...conversation,
    //                     messages: [...conversation.messages, newMessage]

    //                 };
    //             }
    //             return conversation;
    //         });
    //         if (madeChange) {
    //             return newConversations;
    //         } else {
    //             return [...prevConversations, { recipients, messages: [newMessage] }]
    //         }
    //     });
    // },[setConversations]);

    const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
        console.log('%c%s', 'color: #731d1d', sender);
        console.log('%c%s', 'color: #f200e2', text);
        console.log('%c%s', 'color: #1d5673', recipients);
        setConversations(prevConversations => {
          let madeChange = false
          const newMessage = { sender, text }

          const newConversations = prevConversations.map(conversation => {
            if (arrayEquals(conversation.recipients, recipients)) {
              madeChange = true
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage]
              }
            }
    
            return conversation
          })
    
          if (madeChange) {
            return newConversations
          } else {
            return [
              ...prevConversations,
              { recipients, messages: [newMessage] }
            ]
          }
        })
      }, [setConversations])



    // function arrayEquals(a, b) {
    //     if (a.length !== b.length) {
    //         return false;
    //     }
    //     a.sort();
    //     b.sort();
    //     for (let i = 0; i < a.length; i++) {
    //         if (a[i] !== b[i]) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    function arrayEquals(a, b) {
        if (a.length !== b.length) return false
      
        a.sort()
        b.sort()
      
        return a.every((element, index) => {
          return element === b[index]
        })
      }

    useEffect(() => {
        if(socket == null){
            return;
        }
        socket.on("recive-message", addMessageToConversation);
        
        return () => { socket.off("recive-message"); }
    },[socket,addMessageToConversation]);




    function sendMessage(recipients, text) {
        socket.emit('send-message', { recipients, text });
        addMessageToConversation({recipients, text, id});
    }




    return (
        <ConversationsContext.Provider
            value={{ sendMessage,Conversations: formattedConversations, selectedConversation: formattedConversations[selectedConversationIndex], selectedConversationIndex: setSelectedConversationIndex,  createConversations }}
        >
            {children}
        </ConversationsContext.Provider>
    );
}
