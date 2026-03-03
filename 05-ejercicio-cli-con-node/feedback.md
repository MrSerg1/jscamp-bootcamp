## Aquí irá el feedback del ejercicio

Holaa! Muy buen trabajo, felicidades 🎉
Una cosita que no he corregido pero me gustaría que lo tengan en cuenta es lo siguiente:

Siempre que ejecutamos con node un script de un archivo, se suele envolver el código en una función y ejecutarla al final.

```js
function main() {
  // código
}

main();
```

Esto es para que todas las variables que coloquemos dentro de `main` tengan ese scope local y no contaminen el global.
Si no lo hacemos, al ejecutar otro script que también use variables con el mismo nombre, podrían colisionar.

Como en este ejemplo solo trabajamos con un único archivo, no es tan crítico, pero es una buena práctica.