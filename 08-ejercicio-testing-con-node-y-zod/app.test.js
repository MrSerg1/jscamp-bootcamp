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

import { test, describe, before, after } from "node:test";
import assert from "node:assert";
import app from "./app.js";

let server;
const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

// Antes de ejecutar los tests, levantamos el servidor
before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => {
      resolve();
    });
    server.on("error", reject);
  });
});

// Después de ejecutar los tests, cerramos el servidor

after(async () => {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      else resolve();
    });
  });
});

// tests para los endpoints de jobs (GET)
describe("Get /jobs", () => {
  test("debe responder con 200 y un array de trabajos", async () => {
    const response = await fetch(`${BASE_URL}/jobs`);
    assert.strictEqual(
      response.status,
      200,
      "El código de estado debe ser 200",
    );
    const json = await response.json();
    assert.ok(Array.isArray(json.data), "La respuesta debe ser un array");
  });

  test("Debe filtrar trabajos por tecnología", async () => {
    const tech = "react";
    const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`);
    const json = await response.json();
    assert.ok(
      json.data.every((job) => job.data.technology.includes(tech)),
      "Todos los trabajos deben incluir la tecnología especificada",
    );
  });

  test("Debe respetar el límite de los resultados", async () => {
    const limit = 2;
    const res = await fetch(`${BASE_URL}/jobs?limit=${limit}`);
    const json = await res.json();
    assert.ok(json.limit === 2, "El límite no se respeto");
    assert.ok(
      json.data.length === 2,
      "El tamaño de la respuesta es diferente del límite pedido",
    );
  });

  test("Debe aplicar offset correctamente", async () => {
    const offset = 1;
    const res = await fetch(`${BASE_URL}/jobs?offset=${offset}`);
    const json = await res.json();
    // verifica que el valor de offset en la respuesta sea el mismo que el que se envió en la solicitud.
    assert.ok(json.offset === offset, "El offset no se aplico correctamente");
    // verifica que el trabajo entregado es el segundo en el array original.
    assert.strictEqual(
      json.data[0].id,
      "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57",
      "El offset no se aplico correctamente",
    );
  });
});

// Tests para los endpoints de jobs (POST)
describe("POST /jobs", () => {
  test("El nuevo trabajo se añade corectamente con buen formato", async () => {
    const newJob = {
      titulo: "Desarrollador Backend",
      empresa: "Tech Solutions",
      ubicacion: "Madrid, España",
      descripcion:
        "Buscamos un desarrollador backend con experiencia en Node.js y bases de datos.",
      content: {
        description: "Data Driven Co.",
        responsibilities:
          "- Recolectar, procesar y analizar grandes conjuntos de datos para identificar patrones y tendencias.\n- Crear visualizaciones e informes utilizando herramientas como Tableau o Power BI.",
        requirements:
          "- Título universitario en Estadística, Matemáticas, Ciencias de la Computación o campo relacionado.\n- Conocimiento sólido en SQL para consultas de bases de datos.",
        about: "Data Driven Co. ",
      },
      data: {
        technology: ["Node.js", "SQL", "NoSQL"],
        modalidad: "Remoto",
        nivel: "Senior",
      },
    };
    const res = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    const json = await res.json();
    assert.strictEqual(res.status, 201, "El código de estado debe ser 201");
    assert.strictEqual(
      json.titulo,
      newJob.titulo,
      "El título del trabajo no coincide",
    );
    assert.ok(json.id, "El nuevo trabajo debe tener un id generado");
    assert.strictEqual(
      json.empresa,
      newJob.empresa,
      "La empresa del trabajo no coincide",
    );
    assert.strictEqual(
      json.ubicacion,
      newJob.ubicacion,
      "La ubicación del trabajo no coincide",
    );
    assert.strictEqual(
      json.descripcion,
      newJob.descripcion,
      "La descripción del trabajo no coincide",
    );
    assert.deepStrictEqual(
      json.data,
      newJob.data,
      "El contenido del trabajo no coincide",
    );
    assert.deepStrictEqual(
      json.content,
      newJob.content,
      "El contenido del trabajo no coincide",
    );
  });
  test("La petición es validada correctamente", async () => {
    const invalidJob = {
      titulo: "De", // título demasiado corto
      empresa: "Epic Corp", // empresa válida
      ubicacion: "Madrid", // ubicación válida
      descripcion: "Descripción válida",
      content: {
        description: "Descripción del trabajo",
        responsibilities: "Responsabilidades del trabajo",
        requirements: "Requisitos del trabajo",
        about: "Información sobre la empresa",
      },
      data: {
        technology: ["Node.js"],
        modalidad: "Remoto",
        nivel: "Junior",
      },
    };
    const invalidJob2 = {
      titulo: "Ab".repeat(101), // título demasiado largo
      empresa: "Epic Corp", // empresa válida
      ubicacion: "Madrid", // ubicación válida
      descripcion: "Descripción válida",
      content: {
        description: "Descripción del trabajo",
        responsibilities: "Responsabilidades del trabajo",
        requirements: "Requisitos del trabajo",
        about: "Información sobre la empresa",
      },
      data: {
        technology: ["Node.js"],
        modalidad: "Remoto",
        nivel: "Junior",
      },
    };
    const { titulo, ...invalidJob3 } = invalidJob; // título sin campo

    async function attemptCreateJob(jobData) {
      const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });
      return res;
    }
    // Titulo demasiado corto
    const res = await attemptCreateJob(invalidJob);
    const json = await res.json();
    assert.ok(json.error, "La respuesta debe contener un mensaje de error");
    assert.strictEqual(
      res.status,
      400,
      "El código de estado debe ser 400 para datos inválidos",
    );
    // Titulo demasiado largo
    const res2 = await attemptCreateJob(invalidJob2);
    const json2 = await res2.json();
    assert.ok(json2.error, "La respuesta debe contener un mensaje de error");
    assert.strictEqual(
      res2.status,
      400,
      "El código de estado debe ser 400 para datos inválidos",
    );
    // titulo sin campo
    const res3 = await attemptCreateJob(invalidJob3);
    const json3 = await res3.json();
    assert.ok(json3.error, "La respuesta debe contener un mensaje de error");
    assert.strictEqual(
      res3.status,
      400,
      "El código de estado debe ser 400 para datos inválidos",
    );
  });
});

// Test para GET + ID
describe("GET /jobs/:id", () => {
  test("Debe devolver el trabajo con ID especificado", async () => {
    const validId = "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57";
    const res = await fetch(`${BASE_URL}/jobs/${validId}`);
    const json = await res.json();
    assert.strictEqual(res.status, 200, "El código de estado debe ser 200");
    assert.strictEqual(json.id, validId, "El ID del trabajo no coincide");
  });

  test("Debe enviar 404 cuando el ID no existe", async () => {
    const invalidId = "non-existent-id";
    const res = await fetch(`${BASE_URL}/jobs/${invalidId}`);
    const json = await res.json();
    assert.strictEqual(
      res.status,
      404,
      "El código de estado debe ser 404 para un ID no existente",
    );
    assert.ok(json.error, "La respuesta debe contener un mensaje de error");
  });
});

// Test para PUT + ID
describe("PUT /jobs/:id", () => {
  const updatedJob = {
    titulo: "Desarrollador Frontend",
    empresa: "Tech Solutions",
    ubicacion: "Madrid, España",
    descripcion:
      "Buscamos un desarrollador frontend con experiencia en React y diseño de interfaces.",
    content: {
      description: "Tech Solutions",
      responsibilities: "Responsabilidades actualizadas",
      requirements: "Requisitos actualizados",
      about: "Información actualizada sobre la empresa",
    },
    data: {
      technology: ["React", "CSS", "HTML"],
      modalidad: "Presencial",
      nivel: "Mid-Level",
    },
  };
  test("Debe actualizar completamente el trabajo con ID especificado", async () => {
    const validId = "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57";

    const res = await fetch(`${BASE_URL}/jobs/${validId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    assert.strictEqual(res.status, 204, "El código de estado debe ser 204");
    // Verificar que el trabajo se actualizó correctamente
    const getRes = await fetch(`${BASE_URL}/jobs/${validId}`);
    const getJson = await getRes.json();
    assert.strictEqual(
      getJson.titulo,
      updatedJob.titulo,
      "El título del trabajo no coincide después de la actualización",
    );
    assert.strictEqual(
      getJson.empresa,
      updatedJob.empresa,
      "La empresa del trabajo no coincide después de la actualización",
    );
    assert.strictEqual(
      getJson.ubicacion,
      updatedJob.ubicacion,
      "La ubicación del trabajo no coincide después de la actualización",
    );
    assert.strictEqual(
      getJson.descripcion,
      updatedJob.descripcion,
      "La descripción del trabajo no coincide después de la actualización",
    );
    assert.deepStrictEqual(
      getJson.data,
      updatedJob.data,
      "El contenido del trabajo no coincide después de la actualización",
    );
    assert.deepStrictEqual(
      getJson.content,
      updatedJob.content,
      "El contenido del trabajo no coincide después de la actualización",
    );
  });

  test("Debe devolver 404 cuando el ID no existe", async () => {
    const invalidId = "non-existent-id";
    const res = await fetch(`${BASE_URL}/jobs/${invalidId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    assert.strictEqual(
      res.status,
      404,
      "El código de estado debe ser 404 para un ID no existente",
    );
  });
});

// Test para PATCH + ID
describe("PATCH /jobs/:id", () => {
  const partialUpdate = {
    descripcion: "Descripción actualizada solo con PATCH",
  };

  test("Debe recibir 204 y actualizar solo los campos enviados", async () => {
    const validId = "d35b2c89-5d60-4f26-b19a-6cfb2f1a0f57";

    const res = await fetch(`${BASE_URL}/jobs/${validId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialUpdate),
    });
    assert.strictEqual(res.status, 204, "El código de estado debe ser 204");
    // Verificar que solo se actualizó la descripción
    const getRes = await fetch(`${BASE_URL}/jobs/${validId}`);
    const getJson = await getRes.json();
    assert.strictEqual(
      getJson.descripcion,
      partialUpdate.descripcion,
      "La descripción del trabajo no coincide después de la actualización parcial",
    );
  });

  test("Debe devolver 404 cuando el ID no existe", async () => {
    const invalidId = "non-existent-id";
    const res = await fetch(`${BASE_URL}/jobs/${invalidId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialUpdate),
    });
    assert.strictEqual(
      res.status,
      404,
      "El código de estado debe ser 404 para un ID no existente",
    );
  });
});

// Test para DELETE + ID
describe('DELETE /jobs/:id', () => {
    test('Debe recibir 204 y eliminar el trabajo', async () => {
        const validId = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57';

        const res = await fetch(`${BASE_URL}/jobs/${validId}`, {
            method: 'DELETE',
        });
        assert.strictEqual(res.status, 204, 'El código de estado debe ser 204');

        // Verificar que el trabajo se eliminó
        const getRes = await fetch(`${BASE_URL}/jobs/${validId}`);
        assert.strictEqual(getRes.status, 404, 'El trabajo no fue eliminado correctamente');
    })

    test('DEbe devolver 404 cuando el ID no existe', async () => {
        const invalidId = 'non-existent-id';
        const res = await fetch(`${BASE_URL}/jobs/${invalidId}`, {
            method: 'DELETE',
        });
        assert.strictEqual(res.status, 404, 'El código de estado debe ser 404 para un ID no existente');
    })
})