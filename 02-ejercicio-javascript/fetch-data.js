/* Aquí va la lógica para mostrar los resultados de búsqueda */
const container = document.querySelector(".jobs-listings");
fetch("./data.json")
  .then((response) => {
    return response.json();
  })

  .then((jobs) => {
    /* `document.createDocumentFragment()` lo que hace es crear un contenedor virtual que almacena todos los elementos antes de insertarlos en el DOM. Los beneficios de esto es a nivel de rendimiento, en vez de repintar el HTML por cada elemento que dibujemos en el `forEach`, lo que hacemos es guardar todo en este contenedor virtual, y luego dibujar una sola vez el HTML con todos los elementos juntos. */
    const fragmentContainer = document.createDocumentFragment();
    jobs.forEach((job) => {
      const article = document.createElement("li");
      article.className = "job-card";
      article.dataset.modalidad = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;
      article.dataset.tecnologia = job.data.technology;

      article.innerHTML = `
      <article class="job-listing-card">
            <div>
                <h3>${job.titulo}</h3>
                <small>${job.empresa} | ${job.ubicacion}</small>
                <p>
                ${job.descripcion}
                </p>
            </div>
            <div>
             <button class="button-apply-job">Aplicar</button>
            </div>
            `;

      fragmentContainer.appendChild(article);
    });
    container.appendChild(fragmentContainer);
    document.dispatchEvent(new Event("jobsLoaded"));
  });
   