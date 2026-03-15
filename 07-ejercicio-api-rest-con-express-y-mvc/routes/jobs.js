import { Router } from 'express'
import { JobsController } from '../controllers/jobs.js'

export const jobsRouter = Router()

jobsRouter.get('/', JobsController.getAll)
jobsRouter.get('/:id',JobsController.getJobById)

jobsRouter.post('/', JobsController.createJob)

jobsRouter.put('/:id', JobsController.updateJobById)

jobsRouter.patch('/:id', (req, res) => {
    const { id } = req.params
    return res.json({ message: `Actualizar parcialmente un job por id: ${id}` })
})

jobsRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    return res.json({ message: `Eliminar un job por id: ${id}` })
})

/* Aquí debe ir la lógica de tus rutas */
/* Recuerda que en tus rutas debes usar los controladores */
/* 
Deberás implementar:
- Obtener todos los jobs [GET]
- Obtener un job por id [GET]
- Crear un job [POST]
- Actualizar un job por id [PUT]
- Actualizar parcialmente un job por id [PATCH]
- Eliminar un job por id [DELETE]
*/
