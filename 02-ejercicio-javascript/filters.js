/* Aquí va la lógica para filtrar los resultados de búsqueda */
//inputs del filtro

const selects = document.querySelectorAll(".search-filters select");
const searchInput = document.querySelector(".search-bar input");

function applyFilters() {
  const technology = selects[0]?.value ?? "";
  const location = selects[1]?.value ?? "";
  const lvl = selects[2]?.value ?? "";
  const textInput = searchInput?.value.toLowerCase() ?? "";
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
