<!-- Aquí puedes poner tus dudas del ejercicio -->
1 Tengo una duda con respecto a los valores de limit y offset en controllers/jobs.js. 
¿Es correcto convertirlos a número dos veces?(en controller y en models)
¿Debería convertirlos a número antes de enviarlos a JobModel como parametros?  
¿Es mala práctica hacer procesos como convertir a número los parámetros en el controlador?
¿Cuando se obtienen los datos del req.body para crear el objeto (nuevo trabajo) lo que se guarda en por ejemplo 
```const { titulo } = req.body```
Es el valor de titulo? Me refiero es el valor que se le pone en ese parámetro al hacer la petición?
¿Qué es mejor pasar titulo, descripcion, etc del controlador al modelo por separado o es mejor pasarlo como un job, tal que 
``` const job = req.body ```
o hacer lo anterior es mala práctica?
¿Hacer jobs.push no modifica el archivo jobs.json?
