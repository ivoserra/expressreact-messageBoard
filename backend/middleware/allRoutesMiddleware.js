import db from '../db.js'



const requestMessages = (req, res) => res.json(db.data)


const createMessages = (req, res) => {
    req.body.id = Date.now()
    db.data.push(req.body)
    db.write()
    res.status(201)
    res.send({ success: true, message: req.body })
  }



  const editMessages = (req, res) => {
    const id = Number(req.params.id)
    const message= db.data.find(msg => msg.id === id)
    const index= db.data.indexOf(message)
    const newData = req.body
    db.data.splice(index, 1, newData)
    res.status(200).send({ edited: true , message: db.data})
  }


  const deleteMessages = (req, res) => {
    const id = Number(req.params.id)
    const message = db.data.find(msg => msg.id === id)
    const index = db.data.indexOf(message)
    db.data.splice(index, 1)

    res.status(200).send({success: true})
   
  }


  export { requestMessages, createMessages, editMessages, deleteMessages } 