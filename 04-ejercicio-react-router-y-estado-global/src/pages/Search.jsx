import { useEffect, useState } from "react";

import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { useRouter } from "../hooks/useRouter.jsx";

const RESULTS_PER_PAGE = 4;

const useFilters = () => {

  const { query } = useRouter();
  const [ searchParams, setSearchParams ] = query;

  const [filters, setFilters] = useState(() => {
    return {
      technology: searchParams.get("technology") || "",
      location: searchParams.get("type") || "",
      experienceLevel: searchParams.get("level") || "",
    };
  });
  const [textToFilter, setTextToFilter] = useState(() => {
    return searchParams.get("text") || "";
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page") || 1); // page es null, y al transformarlo en Number da como resultado 0. Por eso ponemos || 1
    return Number.isNaN(page) ? 1 : page; // Es al revez, si no es un número, retorna 1
  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textToFilter) params.append("text", textToFilter);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.location) params.append("type", filters.location);
        if (filters.experienceLevel)
          params.append("level", filters.experienceLevel);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("limit", RESULTS_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
        );
        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, currentPage, textToFilter]);

  useEffect(() => {
    
    setSearchParams((params)=>{
      // Para simplificar tanto if/else, podemos hacer una función que ahorre este trabajo. Lo que hiciste está genial si? Es para mostrar otra manera :)
      const setParamIfExist = (param, value) => {
        if(value) params.set(param, value);
        else params.delete(param);
      }
      
      setParamIfExist("text", textToFilter);
      setParamIfExist("technology", filters.technology);
      setParamIfExist("type", filters.location);
      setParamIfExist("level", filters.experienceLevel);
      setParamIfExist("page", currentPage > 1 ? currentPage : undefined);

      return params
    })
  }, [filters, currentPage, textToFilter]);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  };

  return {
    loading,
    jobs,
    total,
    totalPages,
    currentPage,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  };
};

export default function SearchPage() {
  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    textToFilter,
    handlePageChange,
    handleSearch,
    handleTextFilter,
  } = useFilters();

  const title = loading
    ? `Cargando... - DevJobs`
    : `Resultados: ${total}, Página ${currentPage} - DevJobs`;

  return (
    <main>
      <title>{title}</title>
      <meta
        name="description"
        content="Explora miles de oportunidades laborales en el sector tecnológico. Encuentra tu próximo empleo en DevJobs."
      />

      <SearchFormSection
        initialText={textToFilter}
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
      />

      <section>
        <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

        {loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} />}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
