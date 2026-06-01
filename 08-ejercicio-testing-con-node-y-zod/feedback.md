<!-- Aquí irá el feedback del ejercicio -->
Excelente trabajo!
Muy bien aplicado, felicidades!

Aplicaste muy bien los tests.
Una cosa que facilitaría la lectura y reduciría lineas de código es crear una función que haya todo lo repetitivo en los tests, por ejemplo:

```js
const handleGetRequestByPathAndCheckFormat = async (path = '/', expectedStatus = 200) => {
    const res = await fetch(`${BASE_URL}${path}`);
    assert.strictEqual(res.status, expectedStatus);
    assert.strictEqual(
      res.headers.get('content-type')?.includes('application/json'),
      true,
    );

    const data = await res.json();
    return data;
};
```

De esta manera, podemos hacer los tests mas cortos:
```js
describe("Get /jobs", () => {
  test("debe responder con 200 y un array de trabajos", async () => {
    const jobs = await handleGetRequestByPathAndCheckFormat(`${BASE_URL}/jobs`);

    assert.ok(Array.isArray(jobs), "La respuesta debe ser un array");
  });
});
```