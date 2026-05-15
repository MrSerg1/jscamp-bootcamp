<!-- Aquí puedes poner tus dudas del ejercicio -->
1) Tengo una duda con respecto a los valores de limit y offset en controllers/jobs.js. 
¿Es correcto convertirlos a número dos veces?(en controller y en models)
¿Debería convertirlos a número antes de enviarlos a JobModel como parametros?  
¿Es mala práctica hacer procesos como convertir a número los parámetros en el controlador?

**Respuesta:**
No es mala practica pero es redundante. Lo mejor sería pasar los valores en el controlador tal cual vienen de `req.query` y convertirlos a número solo en el modelo. Así el controlador se encarga de orquestar y el modelo se encarga de transformar los datos.

2) ¿Cuando se obtienen los datos del req.body para crear el objeto (nuevo trabajo) lo que se guarda en por ejemplo 
```const { titulo } = req.body```
Es el valor de titulo? Me refiero es el valor que se le pone en ese parámetro al hacer la petición?
¿Qué es mejor pasar titulo, descripcion, etc del controlador al modelo por separado o es mejor pasarlo como un job, tal que 
``` const job = req.body ```
o hacer lo anterior es mala práctica?

**Respuesta:**
`const { titulo } = req.body` extrae el valor que viene en la petición si.
Lo mejor es pasar campos individuales como lo haces ahora para que podamos validar uno por uno. Si pasamos `req.body` directo, cualquier campo extra que el usuario envíe se incluirá en el objeto job.

3) ¿Hacer jobs.push no modifica el archivo jobs.json?

**Respuesta:**
Correcto, no lo modifica. Solo modifica el array `jobs` en memoria (línea 7).

4) Note que cuando hago cambios en la api hay veces que se cae el servidor si lo tengo levantado y aún con la bandera --watch no es capaz de volver a levantarse, para trabajar en el servidor y evitar que esto pase debería poner el código que voy a trabajar dentro de un if?

**Respuesta:**
La flag `--watch` reinicia el servidor en cada cambio solo cuando no hay errores. Si hay errores de sintaxis o runtime, el servidor se cae y no se reinicia automáticamente. Ese es el problema. Ahí lo que toca es volver a levantar.

5) puedo dejar en origenes aceptados origin undefined? para poder mejorar la experiencia de desarrollo?

**Respuesta:**
Podes hacerlo pero no es recomendado en producción. Si queres en modo desarrollo, lo podes dejar, pero cuando lo despliegues si es necesario limitar los orígenes aceptados.