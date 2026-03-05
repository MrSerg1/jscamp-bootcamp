export class JobsController {
    static async getAllJobs(req, res) {
        return res.json({ message: 'Obtener todos los jobs' })   
    }

    static async getJobById(req, res) {
        const { id } = req.params
        return res.json({ message: `Obtener un job por id: ${id}` })   
    }

    static async createJob(req, res) {
        return res.json({ message: 'Crear un job' })
    }

    static async updateJobById(req, res) {
        const { id } = req.params
        return res.json({ message: `Actualizar un job por id: ${id}` })
    }

    static async updatePartialJobById(req, res) {
        const { id } = req.params
        return res.json({ message: `Actualizar parcialmente un job por id: ${id}` })
    }

    static async deleteJobById(req, res) {
        const { id } = req.params
        return res.json({ message: `Eliminar un job por id: ${id}` })
    }
}