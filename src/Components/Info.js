import React,{useState, useEffect} from "react"
import { Form,Button } from 'react-bootstrap'
import Connect from "../InfoConnect"
import "../Styles/newInfoStyle.css"
import Highlighter from "react-highlight-words";


const Info = ({title,category,text,id,setData,user,word}) =>{
    
    const deletee = async () =>{
        const del = await Connect.poista(id)
        const newData = await Connect.getAll()
        setData(newData)
    }
    let split = word.split(" ")
    console.log(split)

    if(user.admin === false){
        return(
            <div >
            <h1>{title}</h1>
            <h3>{category}</h3>
            <pre  className="pre">
            <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={split}
            autoEscape={true}
            textToHighlight={text}/>
            </pre>
            </div>
        )
    }else if(user.admin === true){
        return(
            <div >
                <h1>{title}</h1>
                <h3>{category}</h3>
                <pre className="pre">{text}</pre>
                {user.admin === true &&  <Button variant="danger" onClick={deletee}>Delete</Button>}
            </div>
        )
    }
}

export default Info