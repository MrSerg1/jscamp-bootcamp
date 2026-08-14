import Database from "better-sqlite3";

const db = new Database("jobs.db");

db.pragma("journal_mode = WAL"); // Mejora la concurrencia y performance
db.pragma("foreign_keys = ON"); // sqlite por defecto ignora las claves foráneas, esto las habilita.

export {db as export};
