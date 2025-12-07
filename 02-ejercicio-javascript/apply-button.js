/* Aquí va la lógica para dar funcionalidad al botón de "Aplicar" */
document.addEventListener("DOMContentLoaded", () => {
  const jobResultsSection = document.querySelector(".jobs-listings"); // Selecciona la sección que vamos a escuchar.

  jobResultsSection.addEventListener("click", (event) => {
    const element = event.target;
    if (element.classList.contains("button-apply-job")) {
      element.textContent = "¡Aplicado!"; // Cambia el texto del botón.
      element.disabled = true; // Deshabilita el botón para evitar múltiples clics
      element.style.backgroundColor = "#4caf50"; // Cambia el color de fondo a verde
    } 
  });
});
 