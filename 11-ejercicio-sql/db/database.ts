import Database from "better-sqlite3";

// Ojo con como exportabas el `db`. Era redundante, lo mejor es hacer un export de esta forma
export const db = new Database("jobs.db");

db.pragma("journal_mode = WAL"); // Mejora la concurrencia y performance
db.pragma("foreign_keys = ON"); // sqlite por defecto ignora las claves foráneas, esto las habilita.
