import express from 'express'
import { DEFAULTS } from './config.js'
import { corsMiddleware } from './middlewares/cors.js'
import { jobsRouter } from './routes/jobs.js'
import cors from 'cors'

const PORT = process.env.PORT ?? DEFAULTS.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use('/jobs', jobsRouter)

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})
