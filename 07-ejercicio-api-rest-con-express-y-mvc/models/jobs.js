import jobsData from "../jobs.json" with { type: "json" };
import randoUUID from "node:crypto";

/* Aquí deberá ir la lógica de tu modelo */
/* Recuerda que el modelo SOLO debe manejar la lógica de los datos, en este caso nuestro JSON */

let jobs = jobsData;

export class JobModel {
  static async getAll({ title, text, level, technology, limit, offset }) {
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);
    let filteredJobs = jobs;

    if (title) {
      const searchTitle = title.toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.titulo.toLowerCase().includes(searchTitle),
      );
    }
    if (text) {
      const searchText = text.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.titulo.toLowerCase().includes(searchText) ||
          job.descripcion.toLowerCase().includes(searchText),
      );
    }
    if (level) {
      const searchLevel = level.toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.data.nivel.includes(searchLevel),
      );
    }
    if (technology) {
      const searchTechnology = technology.toLowerCase();
      filteredJobs = filteredJobs.filter((job) =>
        job.data.technology.includes(searchTechnology),
      );
    }

    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
    );

    return { paginatedJobs, limitNumber, offsetNumber };
  }

  static async getJobById(id) {
    const job = jobs.find((job) => job.id === id);
    return job || null;
  }

  static async createJob({
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data,
    content,
  }) {
    const newJob = {
      id: randoUUID.randomUUID(),
      titulo: titulo,
      empresa: empresa,
      ubicacion: ubicacion,
      descripcion: descripcion,
      data: data,
      content: content,
    };
    jobs.push(newJob);
    return newJob;
  }

  static async updateJobById({
    id,
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data,
    content,
  }) {
    const index = jobs.findIndex((job) => job.id === id);
    if (index === -1) return null;

    const updatedJob = {
      id,
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    };
    jobs[index] = updatedJob;
    return updatedJob;
  }

  static async updatePartialJobById({
    id,
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data,
    content,
  }) {
    const job = { titulo, empresa, ubicacion, descripcion, data, content };

    const index = jobs.findIndex((job) => job.id === id);

    if (index === -1) return null;

    jobs[index] = { ...jobs[index], ...job };

    return jobs[index];
  }

  static async deleteJobById(id) {
    jobs = jobs.filter((job) => job.id !== id);
    if (jobs.length !== jobsData.length) {
      return true;
    }
    return false;
  }
}
