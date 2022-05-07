import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../contexts/ContactsProvider'
// import { useConversations } from '../contexts/ConversationsProvider'

export default function ContactModal({ closeModal }) {
    const idRef = useRef();
    const nameRef = useRef();
    const {createContact} = useContacts();

    function handleSubmit(e) {
        e.preventDefault();
        createContact(idRef.current.value, nameRef.current.value);
        closeModal();
    }


    return (
        <>
            <Modal.Header closeButton>Create contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter Id</Form.Label>
                    <Form.Control type="text" placeholder="eg: 12345afe" ref={idRef} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control type="text" placeholder="eg: Abc" ref={nameRef} required/>
                </Form.Group>
                <Button type="submit" className="mt-2">Create</Button> 
                </Form>
            </Modal.Body>
        </>
    )
}