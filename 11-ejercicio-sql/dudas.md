<!-- Aquí puedes poner tus dudas sobre el ejercicio -->
**1 duda**: En @models/job.ts linea 10 almacene la respuesta de la base de datos en una lista con un any porque es un almacenamiento temporal ya que luego reorganizo los datos siguiendo las indicaciones de types.ts. ¿está bien dejar esa lista con un any o debería crear una interface jobRaw en la que pueda almacenar los datos del trabajo aunque sea una lista de uso temporal? ¿vale la pena la inversión de tiempo y lineas para eso o esta bien dejarlo como any?

**2 duda**: ¿Dónde se debería hacer la paginación en la API o usando SQL en la base de datos?

**3 duda**: En @models/job.ts linea 90, cuando hago el mapeo de los datos de la base de datos a la estructura que necesito para la API, ¿está bien que haga un mapeo directo o debería crear una función que haga ese mapeo y así mantener el código más limpio y organizado?

**4 duda**: En @models/job.ts lineas 13 y 67 hice dos consultas a la base de datos diferentes, en una hice 3 llamadas a la base de datos y en la otra hice 1 llamada y arme un objeto con los datos que necesitaba, ¿cuál de las dos formas es mejor para optimizar el rendimiento de la API? ¿Entiendo que hacer una sola llamada a la base de datos es mejor para optimizar el rendimiento, pero en el caso de la primera consulta, no podía hacer una sola llamada porque necesitaba los datos de las tecnologías y no podía hacer un join con la tabla de tecnologías porque no me traía los datos que necesitaba. ¿Cuál sería la mejor forma de hacer esa consulta para optimizar el rendimiento?

**5 duda**: Cuando se borra un trabajo de la base de datos, ¿cómo se modifica la tabla en la base de datos? quiero decir, si la fila se elimina la tabla que al inicio tenia 10 filas, ahora tendrá 9 filas y la fila que se eliminó ya no existirá en la tabla, ¿es así? o ¿la fila se marca como eliminada y sigue existiendo en la tabla?
