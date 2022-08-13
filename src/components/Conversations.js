import React,{useEffect,useState} from 'react'
import { ListGroup } from 'react-bootstrap'
import CloseButton from 'react-bootstrap/CloseButton';
import { useConversations } from '../contexts/ConversationsProvider'

import './Styles/Conversations/conversations.css'
import CloseIcon from '@material-ui/icons/Close';
export default function Conversations() {
  const { Conversations,selectedConversationIndex,setDel} = useConversations();
  
  
  return (
    <ListGroup variant="flush" className='group'>
      {Conversations.map((Conversation,index) => (
        <div key={index}>
        <ListGroup.Item 
          key={Conversation.id}
          action
          onClick={() => {
            selectedConversationIndex(index)}}

          active={Conversation.selected}
          className="conversation-item"
        >
          {Conversation.recipients.map(recipient => recipient.name).join(', ')}      
          
            
        </ListGroup.Item>
        <button onClick={() => {setDel(index)}} className="close">
          <CloseIcon className="conversation-item__close" /></button>
        </div>
      ))}

    </ListGroup>
  )
}
