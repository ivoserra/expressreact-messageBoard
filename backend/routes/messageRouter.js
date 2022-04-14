import express from "express"
import { requestMessages, createMessages, editMessages, deleteMessages} from '../middleware/allRoutesMiddleware.js'

const messageRouter = express.Router()

messageRouter
  .get("/", requestMessages)
  .post("/", createMessages)
  .put("/:id", editMessages)
  .patch("/:id", (req, res) => res.status(501).send({ error: "Not implemented" }))
  .delete("/:id", deleteMessages)

export default messageRouter
