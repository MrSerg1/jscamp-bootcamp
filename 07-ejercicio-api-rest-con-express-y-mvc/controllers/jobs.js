import { DEFAULTS } from "../config.js";
import { JobModel } from "../models/jobs.js";

export class JobsController {
  static async getAll(req, res) {
    const {
      title,
      text,
      level,
      technology,
      limit = DEFAULTS.LIMIT_PAGINATION,
      offset = DEFAULTS.LIMIT_OFFSET,
    } = req.query;

    const { paginatedJobs, limitNumber, offsetNumber } = await JobModel.getAll({
      title,
      text,
      level,
      technology,
      limit,
      offset,
    });

    return res.json({
      data: paginatedJobs,
      total: paginatedJobs.length,
      limit: limitNumber,
      offset: offsetNumber,
    });
  }

  static async getJobById(req, res) {
    const { id } = req.params;
    const jobById = await JobModel.getJobById(id);

    if (!jobById) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.json(jobById);
  }

  static async createJob(req, res) {
    const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;

    if (
      !titulo ||
      !empresa ||
      !ubicacion ||
      !descripcion ||
      !data ||
      !content
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const newJob = await JobModel.createJob({
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    });

    return res.status(201).json(newJob);
  }

  static async updateJobById(req, res) {
    const { id } = req.params;
    const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;

    //Valida que no falten campos en la petición.
    if (!titulo || !empresa || !ubicacion || !descripcion || !data || !content) {
      return res.status(400).json({ "error": "Faltan campos obligatorios" });
    }

    const updatedJob = await JobModel.updateJobById({
      id,
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    });
    
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    return res.json(updatedJob);
  }

  static async updatePartialJobById(req, res) {
    const { id } = req.params;
    return res.json({
      message: `Actualizar parcialmente un job por id: ${id}`,
    });
  }

  static async deleteJobById(req, res) {
    const { id } = req.params;
    return res.json({ message: `Eliminar un job por id: ${id}` });
  }
}
