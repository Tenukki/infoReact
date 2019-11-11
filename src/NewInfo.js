import React,{useState, useEffect} from "react"
import { Form,Button } from 'react-bootstrap'
import "./Styles/newInfoStyle.css"
import Connect from "./InfoConnect"

const NewInfo = ({setData}) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [text, setText] = useState("");

    const postData = async (event) =>{
        event.preventDefault()
        if(title !== "" && category !== "" && text !== ""){
            let data = {
                title,
                category,
                text,
            }
            const response = await Connect.create(data)
            const newData = await Connect.getAll()
            setData(newData)
            console.log(response)
        }else{
            console.log("Dont send empty data")
        }
        
    }
 
    return(
        
            <div className="shadowBackround center effect6">
                
                <Form onSubmit={postData}>
                <Form.Group >
                    <Form.Label>Title:</Form.Label>
                    <Form.Control onChange={event => setTitle(event.target.value)} type="text" placeholder="Enter the title of info" />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Category:</Form.Label>
                    <Form.Control onChange={event => setCategory(event.target.value)} type="text" placeholder="Enter the Category ex.Factory" />
                </Form.Group>
                
                
                <Form.Group >
                    <Form.Label>Write the info conserning the title</Form.Label>
                    <Form.Control onChange={event => setText(event.target.value)} as="textarea" rows="7" />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
                {console.log(category)}
                {console.log(title)}
                {console.log(text)}
                
                </Form>
                
            </div>
        
    )
}

export default NewInfo;