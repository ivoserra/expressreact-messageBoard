const baseurl = process.env.REACT_APP_BACKEND_BASEURL
const url = `${baseurl}/messages`



const passwordStorage = localStorage.getItem('password')
let password = passwordStorage ||  prompt('what is your password')
localStorage.setItem('password', password)


function checkPassword(error, callback){
  if(error === 'Invalid password'){
    password = prompt('Please change your password')
    localStorage.setItem('password', password)
    callback()
  }
}



function handleError(error){
  console.log(error)
  // TODO: Replace alert with a nicer user interface
  checkPassword(error.message)
}



// TODO: Should this be an async function returning the promise of messages?
// TODO: Should this take in the payload as a single parameter?

export function createMessage(name, message, setMessages, messages) {
  const payload = { name, message }
  const config = {
    method: "POST",
    headers: {
      Authorization: password,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }

  fetch(url, config)
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        alert('error: ' + result.error)
        // TODO: Replace alert with a nicer user interface
        checkPassword(result.error, ()=>{
          createMessage(name, message, setMessages, messages)
        })
        return 
      }
      setMessages([...messages, result.message])
     
    })
    .catch(handleError)
}


// TODO: Should this be an async function returning the promise of messages?



export function getMessages(setMessages) {
  const config = {
    headers: {
      "Authorization": password
    }
  }

  fetch(url, config)
    .then(response => response.json())
    .then(result => {
      if (result.error) {
        alert('error: ' + result.error)
        // TODO: Replace alert with a nicer user interface
        checkPassword(result.error, ()=>{
          getMessages(setMessages)


        })
        return
      }
      setMessages(result)
      
    })
    .catch(handleError)
}




export function editMessage(msg, updatedMessage, setMessages){
  const payload={...msg, message:updatedMessage}
   const config={
     method:'PUT',
     headers:{
       Authorization: password,
       "Content-Type": "application/json"
     },
     body:JSON.stringify(payload)
   };

   fetch(`${url}/${msg.id}`, config)
   .then(response => response.json())
   .then(result => {
     if(result.error){
       alert('error: ' + result.error)
       checkPassword(result.error, ()=>{
         editMessage(msg, updatedMessage, setMessages)
       })
     }
     setMessages(result.message)

    })
   .catch(handleError)
}




export function deleteMessage(id,setMessages, messages){
 
  const config = {
    method:"DELETE",
    headers:{
      "Authorization":password,
    },
    
  }
  
  fetch(`${url}/${id}`, config)
  .then(response => response.json())
  .then(result => {
    if(result.error){
      alert('error: ', result.error)
      checkPassword(result.error, ()=>{
        deleteMessage(id, setMessages, messages)
      })
      return
    }
    setMessages(messages.filter(msg => msg.id != id))

  })
  .catch(handleError)

}

