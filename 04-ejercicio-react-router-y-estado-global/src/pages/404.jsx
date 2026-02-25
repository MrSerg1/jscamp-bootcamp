// Exportamos la función como default, para poder importarla en App.jsx y usarla con lazy load
export default function NotFoundPage () {
  return (
    <main>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
    </main>
  )
}