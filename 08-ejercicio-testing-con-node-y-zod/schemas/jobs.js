import { z } from 'zod';

//Esto es para validar los datos de un trabajo (job) y que cumpla con ciertos criterios antes de hacer cambios.

// Definimos el schema para un job completo.

const jobSchema = z.object({
    titulo: z.string('El título es obligatorio').min(3, 'El título debe tener al menos 3 caracteres').max(100, 'El título no puede tener más de 100 caracteres'),
    empresa: z.string('La empresa es obligatoria').min(2, 'La empresa debe tener al menos 2 caracteres').max(50, 'La empresa no puede tener más de 50 caracteres'),
    ubicacion: z.string('La ubicación es obligatoria').min(2, 'La ubicación debe tener al menos 2 caracteres').max(50, 'La ubicación no puede tener más de 50 caracteres'),
    descripcion: z.string().optional(),
    content: z.string().optional(),
    data: z.object({
        technology: z.array(z.string()),
        modalidad: z.string().optional(),
        nivel: z.string().optional(),
    })
})

// Definimos el schema para la actualización parcial de un job (todos los campos son opcionales, pero cumpliendo las mismas reglas de validación si se proporcionan).

const partialJobSchema = z.object({
    titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres').max(100, 'El título no puede tener más de 100 caracteres').optional(),
    empresa: z.string().min(2, 'La empresa debe tener al menos 2 caracteres').max(50, 'La empresa no puede tener más de 50 caracteres').optional(),
    ubicacion: z.string().min(2, 'La ubicación debe tener al menos 2 caracteres').max(50, 'La ubicación no puede tener más de 50 caracteres').optional(),
    descripcion: z.string().optional(),
    content: z.string().optional(),
    data: z.object({
        technology: z.array(z.string()).optional(),
        modalidad: z.string().optional(),
        nivel: z.string().optional(),
    }).optional()
})

// Función para validar un job completo
export function validateJob(input){
    return jobSchema.safeParse(input);
}
// Función para validar un job de actualización parcial.
export function validatePartialJob(input){
    return partialJobSchema.safeParse(input);
}