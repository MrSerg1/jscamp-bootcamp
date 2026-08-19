import crypto from "node:crypto";
import type {
  Job,
  CreateJobDTO,
  UpdateJobDTO,
  JobFilters,
  JobContent,
} from "../types";
import { export as db } from "../db/database.js";

export class JobModel {
  // Obtener todos los jobs con filtros opcionales
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener todos los resultados, y por cada filtro,
    // debemos agregarlo a la consulta
    let query = "SELECT * FROM jobs";
    const conditions = [];
    const values = [];

    if (filters?.modality) {
      conditions.push("modality = ?");
      values.push(filters.modality);
    }

    if (filters?.level) {
      conditions.push("level = ?");
      values.push(filters.level);
    }

    if (filters?.tech) {
      conditions.push(
        "id IN (SELECT job_id FROM job_technologies WHERE technology = ?)",
      );
      values.push(filters.tech);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    const jobData = db.prepare(query).all(...values) as any[];

    return jobData.map((partialJob) => ({
      id: partialJob.id,
      title: partialJob.title,
      company: partialJob.company,
      location: partialJob.location,
      description: partialJob.description,
      data: {
        technology: (
          db
            .prepare("SELECT technology FROM job_technologies WHERE job_id = ?")
            .all(partialJob.id) as { technology: string }[]
        ).map((tech) => tech.technology),
        modality: partialJob.modality,
        level: partialJob.level,
      },
      content: db
        .prepare(
          "SELECT description, responsibilities, requirements, about  FROM job_content WHERE job_id = ?",
        )
        .get(partialJob.id) as JobContent | undefined,
    }));
  }

  // Obtener un job por ID
  static async getById(id: string): Promise<Job | undefined> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener el job por ID
    // Existen 2 descriptions en la base de datos, una en la tabla jobs y otra en la tabla job_content, debemos traer ambas sin sobreescribir la información.
    const jobData = db
      .prepare(
        "SELECT j.id, j.title, j.company, j.location, j.description, j.modality, j.level, jt.technology, jc.description AS content_description, jc.responsibilities, jc.requirements, jc.about FROM jobs j LEFT JOIN job_content jc ON j.id = jc.job_id LEFT JOIN job_technologies jt ON j.id = jt.job_id WHERE j.id = ?",
      )
      .all(id) as any[];

    if (jobData.length === 0) return undefined;

    const jobTechnologies = jobData
      .map((row) => row.technology)
      .filter(Boolean);

    const job = jobData[0];

    return {
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      data: {
        technology: jobTechnologies,
        modality: job.modality,
        level: job.level,
      },
      content: job.content_description
        ? {
            description: job.content_description,
            responsibilities: job.responsibilities,
            requirements: job.requirements,
            about: job.about,
          }
        : undefined,
    };
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    };
    const insertJob = db.prepare(
      `INSERT INTO jobs (id, title, company, location, description, modality, level) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    );
    const insertTech = db.prepare(
      `INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)`,
    );
    const insertContent = db.prepare(
      `INSERT INTO job_content (job_id, description, id, responsibilities, requirements, about) VALUES (?, ?, ?, ?, ?, ?)`,
    );

    const createNewJob = db.transaction((jobData) => {
      insertJob.run(
        jobData.id,
        jobData.title,
        jobData.company,
        jobData.location,
        jobData.description,
        jobData.data.modality,
        jobData.data.level,
      );
      for (const tech of jobData.data.technology) {
        insertTech.run(jobData.id, tech);
      }
      if (jobData.content) {
        insertContent.run(
          jobData.id,
          jobData.content.description,
          crypto.randomUUID(),
          jobData.content.responsibilities,
          jobData.content.requirements,
          jobData.content.about,
        );
      }
    });
    createNewJob(newJob);

    // TODO: Debemos insertar el job en la base de datos
    return newJob;
  }

  // Eliminar un job
  static async delete(id: string): Promise<boolean> {
    // TODO: Debemos eliminar el job de la base de datos
    return false;
  }

  // Actualizar un job
  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    // TODO: Debemos actualizar el job en la base de datos
    return null;
  }
}
