import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:1234",
  "http://jscamp.dev",
  "https://midu.dev",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (ACCEPTED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
  });
};
