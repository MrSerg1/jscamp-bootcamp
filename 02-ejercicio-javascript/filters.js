/* Aquí va la lógica para filtrar los resultados de búsqueda */
//inputs del filtro

const selects = document.querySelectorAll(".search-filters select");
// si bien se puede usar el querySelectorAll para seleccionar los selects, es mejor manejar cada selector por separado. Esto es por un tema de mantenibilidad y claridad en el código. Imagina que cambiamos el orden de los select, o agregamos nuevos que tengan funcionalidades diferentes... si usamos el método anterior, se rompería nuestro código. De esta manera, podemos gestionar cada select de manera precisa.
const technologySelectElement = document.getElementById("filter-technology");
const locationSelectElement = document.getElementById("filter-location");
const lvlSelectElement = document.getElementById('filter-experience-level')
const searchInput = document.querySelector(".search-bar input");

function applyFilters() {
  const technology = technologySelectElement?.value ?? "";
  const location = locationSelectElement?.value ?? "";
  const lvl = lvlSelectElement?.value ?? "";

  // agregamos un .trim() por si el usuario ingresa como texto espacios vacíos
  const textInput = searchInput?.value.toLowerCase().trim() ?? "";
  // Separamos los valores de los selects y el input de texto en variables separadas.
  const allJobs = Array.from(document.querySelectorAll(".job-card")); // Obtenemos todos los trabajos que queremos filtrar en un arreglo de objetos.
  return allJobs.filter((job) => {
    const matchesTitle =
      job.querySelector("h3").textContent.toLowerCase().includes(textInput) ||
      textInput === "";
    const techArray = job.dataset.tecnologia.split(",");
    const matchesTech = 
      technology === "" || techArray.includes(technology);
    const matchesLocation =
      location === "" || location === job.dataset.modalidad;
    const matchesLvl = lvl === "" || lvl === job.dataset.nivel;
    return matchesTech && matchesLocation && matchesLvl && matchesTitle;
  }); // Lógica para filtrar los trabajos según los valores de los filtros seleccionados.
}
function renderJobs() {
    const filteredJobs = applyFilters(); // Obtenemos un nuevo array con los trabajos filtrados.
    const jobsContainer = document.querySelectorAll(".job-card");// Obtenemos todos los trabajos del DOM.
    jobsContainer.forEach((job)=>{
        job.style.display = filteredJobs.includes(job) ? "flex" : "none";
    })//Recorremos los trabajos del DOM y ocultamos los que no están en el array de trabajos filtrados.
  } 

document.addEventListener("jobsLoaded", () => {
selects.forEach((select)=>{
    select.addEventListener("change", renderJobs)
});
searchInput.addEventListener("input", renderJobs);
});
