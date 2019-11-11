import React,{useState, useEffect} from "react"
import { Form,Button,Col,Row,Modal } from 'react-bootstrap'
import Connect from "../InfoConnect"
import "../Styles/newInfoStyle.css"
import { MDBIcon } from "mdbreact";

const Login = ({setUsername, setPassword,handeLogin,click,setClick}) =>{

    if(click == false){
        return(
            <div>
                <MDBIcon far icon="user" onClick={()=> setClick(!click)}/>
            </div>
        )
    }else{
    
    return(
        <div className="shadowBackround3">
            <Modal.Header closeButton onClick={()=>setClick(!click)}></Modal.Header>
            <Form.Group as={Row} >
                <Form.Label column sm="4">
                Username:
                </Form.Label>
                <Col sm="8">
                <Form.Control type="text"onChange={({ target }) => setUsername(target.value)} placeholder="username" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} >
                <Form.Label column sm="4">
                Password:
                </Form.Label>
                <Col sm="8">
                <Form.Control type="password" onChange={({ target }) => setPassword(target.value)} placeholder="Password" />
                </Col>
            </Form.Group>
            <Button className="primary" onClick={handeLogin}>Log in</Button>
        </div>
    )
    }
}

export default Login