import React, { useContext,useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "../contexts/ContactsProvider";

const ConversationsContext = React.createContext();

export function useConversations() {
    return useContext(ConversationsContext);
}

export function ConversationsProvider({ id,children }) {
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
    const { contacts } = useContacts();

    const formattedConversations = Conversations.map((conversation,index) => {
        const recipients = conversation.recipients.map((recipient) => {
            const contact = contacts.find((contact) => {
                return contact.id === recipient;
            });
            const name = (contact && contact.name) || recipient;
            return { id: recipient, name };
        });
        const selected = index === selectedConversationIndex
        return { ...conversation, recipients,selected };
    });



    function addMessageToConversation({recipients,text,sender}){
        setConversations((prevConversations) => {
            let madeChange = false;
            const newMessage = {text,sender};
            if(madeChange){

            }else{
                return[...prevConversations,{recipients,messages:[newMessage]}]
            }
    }
  
    function sendMessage(recipients,text){
      addMessageToConversation(recipients,text,id)
    }
    return (
        <ConversationsContext.Provider
            value={{ sendMessage,selectedConversation:formattedConversations[selectedConversationIndex],selectedConversationIndex:setSelectedConversationIndex,Conversations: formattedConversations, createConversations }}
        >
            {children}
        </ConversationsContext.Provider>
    );
}
