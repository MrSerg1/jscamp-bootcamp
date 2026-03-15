import { Router } from 'express'
import { JobsController } from '../controllers/jobs.js'

export const jobsRouter = Router()

jobsRouter.get('/', JobsController.getAll)
jobsRouter.get('/:id',JobsController.getJobById)
jobsRouter.post('/', JobsController.createJob)
jobsRouter.put('/:id', JobsController.updateJobById)

jobsRouter.patch('/:id', JobsController.updatePartialJobById)

jobsRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    return res.json({ message: `Eliminar un job por id: ${id}` })
})

/* Aquí debe ir la lógica de tus rutas */
/* Recuerda que en tus rutas debes usar los controladores */
/* 
Deberás implementar:
- Obtener todos los jobs [GET] check
- Obtener un job por id [GET] check
- Crear un job [POST] check
- Actualizar un job por id [PUT] check

- Actualizar parcialmente un job por id [PATCH]
- Eliminar un job por id [DELETE]
*/
