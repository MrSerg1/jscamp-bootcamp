import { export as db } from "./database.js";
import jobs from "../jobs.json";
import crypto from "node:crypto";

db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT NOT NULL,
        modality TEXT NOT NULL CHECK (modality IN ('remote', 'onsite', 'hybrid')),
        level TEXT NOT NULL CHECK (level IN ('junior', 'mid', 'senior'))
        )
    `);

db.exec(`
    CREATE TABLE IF NOT EXISTS job_technologies (
        job_id TEXT NOT NULL,
        technology TEXT NOT NULL,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
        )
    `);

db.exec(`
    CREATE TABLE IF NOT EXISTS job_content(
        job_id TEXT NOT NULL,
        description TEXT NOT NULL,
        id TEXT PRIMARY KEY,
        responsibilities TEXT NOT NULL,
        requirements TEXT NOT NULL,
        about TEXT NOT NULL,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
        )
    `);

const insertJob = db.prepare(
  `INSERT INTO jobs (id, title, company, location, description, modality, level) VALUES (?, ?, ?, ?, ?, ?, ?)`,
);
const insertTech = db.prepare(
  `INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)`,
);
const insertContent = db.prepare(
  `INSERT INTO job_content (job_id, description, id, responsibilities, requirements, about) VALUES (?, ?, ?, ?, ?, ?)`,
);

const seedAll = db.transaction((jobsData) => {
  for (const job of jobsData) {
    insertJob.run(
      job.id,
      job.title,
      job.company,
      job.location,
      job.description,
      job.modality,
      job.level,
    );  
    for (const tech of job.technologies){
      insertTech.run(job.id, tech);
    }
    insertContent.run(
      job.id,
      job.content.description,
      crypto.randomUUID(),
      job.content.responsibilities,
      job.content.requirements,
      job.content.about,
    );
  }
});

seedAll(jobs);
console.log(" Database seeded successfully!");
