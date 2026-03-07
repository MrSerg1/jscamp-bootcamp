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

    const {paginatedJobs, limitNumber, offsetNumber} = await JobModel.getAll({
      title,
      text,
      level,
      technology,
      limit,
      offset,
    })
    
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
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    return res.json(jobById);
  }

  static async createJob(req, res) {
    return res.json({ message: "Crear un job" });
  }

  static async updateJobById(req, res) {
    const { id } = req.params;
    return res.json({ message: `Actualizar un job por id: ${id}` });
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
