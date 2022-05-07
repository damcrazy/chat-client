import React, { useRef } from "react";
import {v4 as uuid} from 'uuid';
//components
import { Container, Form,Button } from "react-bootstrap";

//css
import "./index-login.css";

export default function Login({id}) {
    
    const idref = useRef();
    function handleSubmit(e){
        e.preventDefault();
        id(idref.current.value);
    }

    function createNewid(){
        id(uuid());
    }

    return (
        <Container className="contain">
            <Form className="w-100" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter Id</Form.Label>
                    <Form.Control type="text" placeholder="eg: 12345afe" ref={idref} className="w-100" />
                    
                </Form.Group>
                <div className="w-100">
                <Button type="submit" className="m-2">Login</Button>
                <Button onClick={createNewid} className="btn btn-secondary m-2">Create new Id</Button>
                </div>
            </Form>
        </Container>
    );
}
