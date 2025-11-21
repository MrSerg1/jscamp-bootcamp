/* Aquí va la lógica para mostrar los resultados de búsqueda */
const container = document.querySelector(".jobs-listings");
fetch("./data.json")
  .then((response) => {
    return response.json();
  })

  .then((jobs) => {
    jobs.forEach((job) => {
      const article = document.createElement("article");
      article.className = "jobs";
      article.dataset.modalidad = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;
      article.dataset.tecnologia = job.data.technology;

      article.innerHTML = `
            <li>
                <h3>${job.titulo}</h3>
                <p>${job.empresa} | ${job.ubicacion}</p>
                <p>
                ${job.descripcion}
                </p>
            </li>
            <div class="job-apply">
                <button class="apply-button" hreff="">Aplicar</button>
            </div>
            `;
      container.appendChild(article);
    });
  });
