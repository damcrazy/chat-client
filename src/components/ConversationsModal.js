import React,{ useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
import {useConversations} from '../contexts/ConversationsProvider'
// import useLocalStorage from '../hooks/useLocalStorage'


export default function ConversationsModal({ closeModal}) {

    const [selectedContactIds,setSelectedContactIds] = useState([]);
    const {contacts} = useContacts();
    const {createConversations} = useConversations();

    function handleSubmit(e) {
        e.preventDefault();
        createConversations(selectedContactIds);
        closeModal();
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if(prevSelectedContactIds.includes(contactId)){
                return prevSelectedContactIds.filter(prevId =>{
                    return contactId !== prevId;
                })
    }else{
        return [...prevSelectedContactIds,contactId]
    }
})
}


    return (
        <>
        <Modal.Header closeButton>Create Conversations</Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
            {contacts.map(contact => (
                <Form.Group key={contact.id}>
                    <Form.Check
                    type="checkbox"
                    value={selectedContactIds.includes(contact.id)}
                    label={contact.name}
                    onChange={() =>  handleCheckboxChange(contact.id) }
                />
                </Form.Group>

            ))}
            <Button type="submit" className="mt-2">Add Conversations</Button> 
            </Form>
        </Modal.Body>
    </>
    )
}
