import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider'



export default function Conversations() {
  const { Conversations,selectedConversationIndex} = useConversations();
  // console.log(Conversations);
  return (
    <ListGroup variant="flush">
      {Conversations.map((Conversation,index) => (
        <ListGroup.Item 
          key={Conversation.id}
          action
          onClick={() => {
            selectedConversationIndex(index)}}

          active={Conversation.selected}
        >
          {Conversation.recipients.map(recipient => recipient.name).join(', ')}
        </ListGroup.Item>
      ))}
    </ListGroup>
  )
}
