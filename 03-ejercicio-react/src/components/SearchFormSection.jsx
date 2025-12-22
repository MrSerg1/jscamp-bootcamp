import { useRef } from "react";

export function SearchFormSection({ onChangeFilter, initialFilters }) {
 const timeOutId = useRef(null);

  const handleFilChange = (event) => {
    const formData = new FormData(event.currentTarget);
    const filters = {
      search: formData.get("search-value"),
      technology: formData.get("technology-value"),
      location: formData.get("location-value"),
      experienceLvl: formData.get("experience-level-value"),
    };
    if (timeOutId.current){ 
     clearTimeout(timeOutId.current)
    }
    timeOutId.current = setTimeout(() => {
      onChangeFilter(filters);
    }, 500);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form id="empleos-search-form" role="search" onChange={handleFilChange} onSubmit={handleSubmit}>
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            defaultValue={initialFilters.search}
            id="empleos-search-input"
            type="text"
            name="search-value"
            placeholder="Buscar trabajos, empresas o habilidades"
          />
        </div>

        <div className="search-filters">
          {/* genial el uso del name! También se puede usar `useId()`, pero entiendo que para este caso, no hay ningún problema y lo estás asociando a los searchParams, así que estoy de acuerdo como lo hiciste :) */}
          <select 
          name="technology-value" id="filter-technology"
          defaultValue={initialFilters.technology}
          >
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select 
          name="location-value" 
          id="filter-location"
          defaultValue={initialFilters.location}
          >
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select 
          name="experience-level-value" id="filter-experience-level"
          defaultValue={initialFilters.experienceLvl}
          >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div>
      </form>

      <span id="filter-selected-value"></span>
    </section>
  );
}
