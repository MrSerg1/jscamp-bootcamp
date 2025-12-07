/* Aquí va la lógica para mostrar los resultados de búsqueda */
const container = document.querySelector(".jobs-listings");
fetch("./data.json")
  .then((response) => {
    return response.json();
  })

  .then((jobs) => {
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
      container.appendChild(article);
    });
    document.dispatchEvent(new Event("jobsLoaded"));
  });
   