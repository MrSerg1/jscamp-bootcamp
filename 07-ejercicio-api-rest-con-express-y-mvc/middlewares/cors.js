import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:5173',
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
        console.log('Origin:', origin)
      if (ACCEPTED_ORIGINS.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Origen no permitido por CORS'))
      }
    }
  })
}