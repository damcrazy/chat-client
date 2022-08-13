import React from 'react'
import {Tab,Nav, Button,Modal} from 'react-bootstrap'
import { FiCopy } from 'react-icons/fi';


import Contact from './Contact'
import Conversations from './Conversations'
import ContactModal from './ContactModal.js'
import ConversationsModal from './ConversationsModal'

//css
import './Styles/Sidebar/sidebar.css'

const conv_key = "conversations";
const contact_key = "contact";

export default function Sidebar({id,setId}) {
    const [activeKey, setActiveKey] = React.useState(conv_key);
    const [modalOpen, setModalOpen] = React.useState(false);

    function closeModal(){
        setModalOpen(false);
    }
  return (
      <>
    <div style={{width: '250px',borderRight: '1px solid'}}>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
            <Nav variant="tabs" className="justify-content-center segmented-control">
                <Nav.Item>
                    <Nav.Link className="segmented-control__1" eventKey={conv_key} style={{cursor:'pointer'}}>
                    conversations
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className="segmented-control__2" eventKey={contact_key} style={{cursor:'pointer'}} >
                        contacts
                    </Nav.Link>
                </Nav.Item>
                <div class="segmented-control__color"></div>
            </Nav>
            <Tab.Content className="border-right overflow-auto flex-grow-1">
                <Tab.Pane eventKey={conv_key} >
                    <Conversations/>
                </Tab.Pane>
                <Tab.Pane eventKey={contact_key} >
                    <Contact/>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
        <div className="m-4" ><h4 className="m-0">Your id</h4><br/>{id}<Button className="btn__secondary" onClick={() => {navigator.clipboard.writeText(id);
        }}>
        <FiCopy />
            </Button></div>
        <Button className="w-100 rounded-0" onClick={() => {setModalOpen(true)}}>
            New {activeKey === conv_key ? "conversation" : "contact"}
        </Button>
        <Modal show={modalOpen} onHide={closeModal}>
            {activeKey === conv_key ? <ConversationsModal closeModal={closeModal}/> : <ContactModal closeModal={closeModal}/>}
        </Modal>
    <button onClick={() => {setId("0")}} className="btn btn-light"> logout </button>
    </div>
    </>
  )
}
