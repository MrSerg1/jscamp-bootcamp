# Aquí puedes dejar tus dudas

## Primera parte

<!-- Dudas de la primera parte del ejercicio -->
- Cuando ejecuto npm run dev recibo un error, luego note que hay un archivo pnpm, debo instalar pnpm o algo por el estilo?

### Respuesta

Hola! Que bien que lo viste, acabo de revisar el archivo que les generamos y nos quedó un archivo pnpm.lock colocado. Eso hacía que cuando ejecutaban npm run dev, saliera un error. Ya lo solucionamos para que el resto de compañeros no les pase lo mismo.
Puedes usar `npm`, `pnpm` o lo que más cómodo te haga sentir. A modo personal me gusta más `pnpm` por ser más rápido.


## Segunda parte

<!-- Dudas de la segunda parte del ejercicio -->
- jobsData.map crea un nuevo array y pasa los objetos que contiene uno por uno?
- No, crea un nuevo array aplicando los cambios que tiene dentro en este caso crea un article con cada objeto.
- ¿Veo que le pasamos key = {job.id} al componente JobCard pero no tratamos esa prop, job={job} lo usamos pero donde queda ese key?


### Respuesta

Siempre que ejecutamos el método `.map()` en un array, lo que hacemos es devolver uno nuevo con los cambios que le indiquemos. Por ejemplo:

```js
const products = ['pan', 'queso']

const productsWithIndex = products.map((product, index) => {
    return {
        product,
        index
    }
})

console.log(products)
console.log(productsWithIndex)
//  -> products != productsWithIndex
// No son lo mismo! `product` sigue siendo el mismo array, mientras que `productsWithIndex` es un nuevo array con las modificaciones que le indicamos.

// OTRO EJEMPLO
// si no hacemos ninguna modificación, también devolvemos un array con los mismos valores pero diferente referencia.

const list = ['midudev', 'pheralb']
const copyList = list.map((item) => item)

// list no es la misma referencia que copyList. Por lo tanto son distintos pese a que su valor sea el mismo.
```

---

Sobre la prop `key`, es muy buena pregunta!

Te comento:
`key` es una propiedad especial de React que se necesita poner cuando hacemos un mapeo de elementos. Es más, en este caso mapeamos un componente, pero si hacemos esto:

```jsx
{
  list.map((el) => {
    return <div key={el.id}>{el}</div>
  })
}
```

también es obligatorio ponerlo. Y se hace por una cuestión de optimización, y que React lo necesita para identificar los elementos de la lista individualmente.

Dando un poco más de detalle, si nosotros no ponemos la key, esto va a funcionar bien. Pero, React al mapearlos no tiene ninguna referencia para identificar cual es cada elemento. Y si ese elemento por interacción nuestra cambia o lo eliminamos, ahí es donde se vuelve loco:

Supongamos que React saca dos fotos, una antes de eliminar un elemento y otra después. Él tiene que identificar los cambios para poder repintar los elementos nuevamente. Y si entre esas dos "fotos", eliminamos elementos y modificamos otros, no va a saber que hacer para optimizar este repintado de la mejor manera. Por esto, es importante poner una key, para saber exactamente qué elemento es el que se está modificando o eliminando.

## Tercera parte

<!-- Dudas de la tercera parte del ejercicio -->

## Cuarta parte

<!-- Dudas de la cuarta parte del ejercicio -->

## Quinta parte

<!-- Dudas de la quinta parte del ejercicio -->

## Sexta parte

<!-- Dudas de la sexta parte del ejercicio -->

## Séptima parte

<!-- Dudas de la séptima parte del ejercicio -->
- Cuando haces un custom Hook he visto que puedes seleccionar solo uno de los valores que exporta el hook, por ejemplo se puede usar const { navigateTo } = useRouter(); y se selecciona el navigateTo, por qué no se selecciona el currentPath?
- Es por la desectructuración de objetos en js.

-¿Por qué el component en Route debe ir en mayuscula?

---

### Respuesta:

Los custom hooks no dejan de ser funciones, por lo tanto, si en una función devuelvo un objeto, al acceder al valor de su retorno, puedo indicar si quiero todas las propiedades, o solo algunas

```js
function getUser() {
  return {
    name: 'midudev',
    age: 30,
    country: 'Spain'
  }
}

const user = getUser() // <- { name: 'midudev', age: 30, country: 'Spain' }

const { name, age } = getUser() // <- { name: 'midudev', age: 30 }

const { name } = getUser() // <- { name: 'midudev' }

```

Si lo pensamos en el hook, es lo mismo. En el caso de `useRouter()`, en algunos lugares solo necesitamos el `navigateTo`, por lo que lo desestructuramos para obtener solo esa propiedad

---

Respondiendo la otra pregunta, React de alguna manera tiene que detectar lo que es un componente, y lo que es una etiqueta jsx (como div, p, etc). Por lo tanto, si nosotros solo ponemos <component />, lo va a detectar como un elemento jsx, y no un custom component como tal. Por eso es importante usar mayúsculas en el nombre del componente.

## Ejercicio extra

<!-- Dudas del ejercicio extra -->

¿En la paginación poner currentPage - 1 en href nos pondría /search?page=0 si page es 1 hay algun problema con ello?

---

### Respuesta:

Lo que podemos hacer es lo siguiente:

```js
(Math.max(currentPage, 1) - 1)
```

Para asegurarnos de que currentPage nunca sea menor a 1. 