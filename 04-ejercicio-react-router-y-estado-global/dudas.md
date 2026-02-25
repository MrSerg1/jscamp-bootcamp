# Aquí puedes dejar tus dudas

## Primera parte

<!-- Dudas de la primera parte del ejercicio -->
¿Por qué con el router manual no se creaba un bucle infinito al poner el navigateTo como dependencia en el fetchJobs pero con el navigateTo de react-router crea un bucle infinito?

---

**Respuesta:**

Hola crack! Muy buena pregunta (ya te lo dejé arreglado en el código), aquí pasaron dos cosas:

1. Estabas exportando mal el `navigateTo`

En tu código tenias esto:

```jsx
const { params } = useRouter()
const navigateTo = useRouter()
```

Cuando debería ser así:

```jsx
const { navigateTo } = useRouter()
const { params } = useRouter()
```

O simplificando:

```jsx
const { params, navigateTo } = useRouter()
```

Entonces al colocar `navigateTo` como dependencia del useEffect, no estabas evaluando la función, sino el objeto completo que devolvía el hook `useRouter`.

Al ejecutar el hook dos veces:

```jsx
const { params } = useRouter()
const navigateTo = useRouter()
```

Estabas haciendo que el hook se monte dos veces, por lo que se ejecutaba nuevamente los valores del mismo.

Eso es uno de los motivos, pero va de la mano con otro:

2. No estabas envolviendo `navigateTo` en `useCallback`.

Entonces cada vez que llamabas a `useRouter()`, estabas volviendo a crear la función `navigateTo`.

Esto hacía también que el `useEffect` se ejecutara cada vez que se renderizara el componente.

En conclusión, la solución fue:
1. Exportar correctamente el `navigateTo`.
2. Usar `useCallback` para evitar que la función se creara cada vez que se renderizara el componente.

## Segunda parte

<!-- Dudas de la segunda parte del ejercicio -->
¿Por qué se usa el div como un componente de react tipo <div className/> en lugar de <div> dangerouslySetInnerHTML = {{__html: html}} </div>

---

**Respuesta:**

Te referís a por qué no usamos un `dangerouslySetInnerHTML` en el h2? No entendí, si es ese el caso te explico a continuación, sino porfa me lo vuelves a decir:

```jsx
<h2 className={styles.sectionTitle}>{title}</h2>

<div
  className={styles.sectionContent}
  dangerouslySetInnerHTML={{ __html: html }}
/>
```

No usamos `dangerouslySetInnerHTML` porque entendemos que el `h2` es siempre un texto. Pero bien podríamos poner dangerouslySetInnerHTML si quisieramos.

## Tercera parte

<!-- Dudas de la tercera parte del ejercicio -->
¿Es buena practica tener un custom hook para usar react router? 

---
**Respuesta:**

Es conveniente a futuro. Eso implica que si no lo hacemos está mal? No. Pero está bueno por la siguiente razón:

Cuando creamos un custom hook que envuelve métodos/funcionalidades de una librería, lo que hacemos es crear una capa de abstracción. Por ejemplo, si en el futuro cambiamos de librería, solo tendremos que cambiar el custom hook y no el código de todos los componentes que lo usen.

## Cuarta parte

<!-- Dudas de la cuarta parte del ejercicio -->
¿El suspense sólo se activa cuando se hace una petición fetch? Me refiero a que no veo que se muestre la página de carga al iniciar la aplicación, solo veo que se activa cuando se pide algo a la API. (Baje la carga de datos a 3G)

---
**Respuesta:**

No, Suspense se activa cuando el componente que es envuelto por él no se ha cargado aún. Y eso lo logramos con `lazy`.

Si te vas a `/` y recargas la página, vas a ver que aparece el loader del `Suspense`.

Ahora, hay una cosa muy loca que pasa cuando nosotros navegamos de sitio, por ejemplo de `/` a `/search`.

Si ves las devTools, en Network vas a ver que el componente de `Search` se carga solo cuando navegamos hacia `/search`, pero no se ve el fallback del Suspense.

Eso pasa por la mezcla de dos conceptos:

1. React tiene un hook llamado `useTransition` que nos permite marcar ciertas operaciones como "transiciones".

```jsx
const [isPending, startTransition] = useTransition()
```

Sin entrar mucho en detalle para ir directo al problema, cuando una actualización de un estado se marca como una transición, React intenta mantener la interfaz actual visible mientras se carga el nuevo contenido. En este caso, cuando navegamos de `/` a `/search`, React mantiene la UI que se ve en `/` hasta que termina de cargar el `Search` en `/search`.

Hasta aquí vamos bien, si React ve que hay algo en pantalla, lo sigue mostrando hasta que termina de cargar la nueva UI.

Pero, por qué pasa esto si no estamos usando `useTransition`?

La respuesta es: react-router tiene un `useTransition` interno que se encarga de marcar las operaciones de navegación como transiciones.

Entonces, aunque pongamos `Suspense`, el `useTransition` interno de react-router nos mantiene la UI visible hasta que termina de cargar la nueva UI.

Esto no significa que tengamos que dejar de usar `Suspense`, de hecho es una buena idea para que el componente de cada página solo cargue cuando nos dirigimos a ella.

Pero esta es la razón por la que no vemos el fallback del Suspense cuando navegamos de `/` a `/search` u otro path.

(Estuvo complicado el tema, espero se haya entendido :) Sino nos puedes preguntar)

## Quinta parte

<!-- Dudas de la quinta parte del ejercicio -->



## Sexta parte

<!-- Dudas de la sexta parte del ejercicio -->

¿Por qué se usa [...state.favorites, jobId] en lugar de push para agregar el id a la lista? ¿Es porque push no crea un nuevo array? ¿Por qué se necesita crear un nuevo array, para avisarle a react y re-renderice?
Tengo la misma duda con el removeFavorite por que no usar el metodo .splice() en lugar de filtrar. 

---
**Respuesta:**

Tanto push como splice modifican el array original, y cuando asignamos un nuevo valor al objeto del state, queremos realmente asignarle el valor que queremos que tenga. No modificar el valor original.

Esto pasa con `react-router` como en cualquier código en el que queremos asignar un nuevo valor de una propiedad a partir de otro.