/* Crea aquí tu archivo 404 */
import robot from "../assets/404robot.png";

export function NotFound() {
  return (
    <div className="not-found-container">
      <img 
        src={robot} 
        alt="Página no encontrada - Error 404" 
        className="not-found-image"
      />
      <h1>¡404! Not Found</h1>
    <h1>Parece que la página no existe.</h1>
    </div>
  );
}
