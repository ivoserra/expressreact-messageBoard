import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import requestLogger from './middleware/requestLogger.js'
import messageRouter from './routes/messageRouter.js'
import checkPassword from './middleware/checkPassword.js'

// Initialize app
const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(checkPassword)

dotenv.config()

// Add endpoints
app.use("/messages", messageRouter)

// Add error handling middlewares
app.use((req, res) => res.status(404).send({ error: "Resource not found" }))

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send({ error: err.message })
})

// Start listening
const { PORT } = process.env
app.listen(PORT, () => console.log(`Up http://localhost:${PORT}`))