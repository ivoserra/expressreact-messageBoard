import { Form, Button, InputGroup, FormControl} from "react-bootstrap"
import { useEffect, useState } from "react"
import * as api from "./lib/api.js"
import "bootstrap/dist/css/bootstrap.min.css"



function App() {


  const [messages, setMessages] = useState([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isEditingActive, setIsEditingActive]= useState('')
  const [ updatedMessage, setUpdatedMessage]=useState('')


  useEffect(() => {
    api.getMessages(setMessages)
  },[])




  function handleSubmit(e) {
    e.preventDefault() 
    api.createMessage(name, message, setMessages, messages)
   
  }


  function handleSendMessage(msg){
    api.editMessage(msg, updatedMessage, setMessages)
    setIsEditingActive('')

  }


  function handleMessageUpdate(e){
    setUpdatedMessage(e.target.value);
  }



  function handleEdit(msg){
    setIsEditingActive(msg.id)
  }


  function handleDelete(id){
    api.deleteMessage(id,setMessages, messages)
  }

  return (
    <div className="App">
      <h1>Message board</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Message"
            onChange={e => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <ul>
        {messages.map(msg => (
          <div>
            {isEditingActive == msg.id ?
            <div>
              <InputGroup size="sm" className="m-2">
                <FormControl aria-label="Small" aria-described by="inputGroup-sizing-sm" onChange={handleMessageUpdate} defaultValue={msg.message} />
              </InputGroup>
              <Button variant="primary" type="submit" onClick={() => handleSendMessage(msg)}>
                Confirm
              </Button>
            </div>
             :
          <li key={msg.id} className="mt-4">{msg.name}: {msg.message} </li>}
            <Button variant="primary" type="submit" onClick={() => handleDelete(msg.id)}>
              Delete
            </Button>
            <Button variant="primary" type="submit" className="m-1" onClick={() => handleEdit(msg)}>
              Edit
            </Button>
        </div>
        ))}
      </ul>
    </div>
  )
}

export default App
