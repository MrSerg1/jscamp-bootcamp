/*
 * Aquí debes escribir tus tests para la API de jobs
 *
 * Recuerda:
 * - Usar node:test y node:assert (sin dependencias externas)
 * - Levantar el servidor con before() y cerrarlo con after()
 * - Testear todos los endpoints: GET, POST, PUT, PATCH, DELETE
 * - Verificar validaciones con Zod
 * - Comprobar códigos de estado HTTP correctos
 */

import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'
import { log } from 'node:console'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`

// Antes de ejecutar los tests, levantamos el servidor
before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => {
            resolve()
        })
        server.on('error', reject)
    })
})

// Después de ejecutar los tests, cerramos el servidor

after(async ()=>{
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err)
            else resolve()
        })
    })
})

// tests para los endpoints de jobs (GET, POST, PUT, PATCH, DELETE) y las validaciones con Zod

describe('Get /jobs', ()=>{
    test('debe responder con 200 y un array de trabajos', async ()=>{
        const response = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(response.status, 200, 'El código de estado debe ser 200')
        const json = await response.json()
        assert.ok(Array.isArray(json.data), 'La respuesta debe ser un array')
    })

    test('Debe filtrar trabajos por tecnología', async ()=>{
        const tech = 'react'
        const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`)
        const json = await response.json()
        assert.ok(json.data.every(job=>job.data.technology.includes(tech)), 'Todos los trabajos deben incluir la tecnología especificada')
    })

    test('Debe respetar el límite de los resultados', async()=>{
        const limit = 2
        const res = await fetch(`${BASE_URL}/jobs?limit=${limit}`)
        const json = await res.json()
        assert.ok(json.limit === 2, 'El límite no se respeto')
        assert.ok(json.data.length === 2, 'El tamaño de la respuesta es diferente del límite pedido')
    })
})

