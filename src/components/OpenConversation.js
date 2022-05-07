import React,{useState} from 'react'
import {Form,InputGroup, Button} from 'react-bootstrap'
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {
const [text,setText] = useState('');

    const {sendMessage,selectedConversation} = useConversations();

    function handleSubmit(e) {
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r => r.id), text);
        setText('');
    }   

  return (
    <div className="d-flex flex-column flex-grow-1 ">
        <div className="flex-grow-1 overflow-auto">

        </div>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <InputGroup className="p-2">
                    <Form.Control
                    as="textarea"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{height: '100px',resize: 'none',borderRadius: '0px'}}
                    required />
                    {/* <InputGroup.Append> */}
                        <Button type="submit">Send</Button>
                    {/* </InputGroup.Append> */}
                </InputGroup>
            </Form.Group>
        </Form>
    </div>
  )
}
