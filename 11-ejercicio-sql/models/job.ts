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
            .prepare(
              "SELECT technology FROM job_technologies WHERE job_id = ?",
            )
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
    return undefined;
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    };

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
