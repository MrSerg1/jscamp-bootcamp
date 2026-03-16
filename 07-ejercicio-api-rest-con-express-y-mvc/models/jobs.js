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

    const filters = [
      {
        active: title,
        check: (j) => j.titulo.toLowerCase().includes(title.toLowerCase()),
      },
      {
        active: text,
        check: (j) =>
          j.titulo.toLowerCase().includes(text.toLowerCase()) ||
          j.descripcion.toLowerCase().includes(text.toLowerCase()),
      },
      {
        active: level,
        check: (j) => j.data.nivel.toLowerCase().includes(level.toLowerCase()),
      },
      {
        active: technology,
        check: (j) =>
          j.data.technology.some(
            (t) => t.toLowerCase() === technology.toLowerCase(),
          ),
      },
    ];

    filteredJobs = filteredJobs.filter(job => {
      return filters //Regresa el array de filtros
        .filter(f => f.active) // Solo consideramos los filtros que están activos
        .every(f => f.check(job)); // El job debe pasar todos los filtros activos para ser incluido
    });

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
    //Guardamos longitud inicial
    const initialLength = jobs.length;
    //Filtramos el array de jobs para eliminar el job con el id dado
    jobs = jobs.filter((job) => job.id !== id);
    //Si la longitud del array después de filtrar es igual a la longitud inicial, significa que no se eliminó ningún job (porque no se encontró el id)
    return jobs.length !== initialLength;
  }
}
