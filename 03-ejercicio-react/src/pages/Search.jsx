/* Pasa tu contenido de src/App.jsx aquí */

import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { SearchResultsSection } from "../components/SearchResultsSection.jsx";

import { useState, useEffect } from "react";
import { useRouter } from "../hooks/useRouter.jsx";
import { useNewUrl } from "../hooks/useNewUrl.jsx";

export function Search() {
  // Estados y router
  const { navigateTo } = useRouter();
  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get("page"));
    return isNaN(page) || page < 1 ? 1 : page;
  });
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get("text") || "",
      technology: params.get("technology") || "",
      location: params.get("type") || "",
      experienceLvl: params.get("level") || "",
    };
  });
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Handlers
  const handleChangeFilter = (newFilters) => {
    setFilters({
      search: newFilters.search,
      technology: newFilters.technology,
      location: newFilters.location,
      experienceLvl: newFilters.experienceLvl,
    });
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Efectos
  const RESULTS_PER_PAGE = 5;
  const { newUrl, queryParams } = useNewUrl({
    filters,
    currentPage,
    resultsPerPage: RESULTS_PER_PAGE,
  });
  // Set de los filtros en la URL y navegación
  useEffect(() => {
    navigateTo(newUrl);
  }, [newUrl, navigateTo]);
  // Efecto para el fetch
  useEffect(() => {
    async function fetchJobs() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`
        );
        const json = await response.json();
        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchJobs();
  }, [queryParams]);
  // Set titulo de la página
  useEffect(() => {
    document.title = `Resultados ${total} - Página ${currentPage} - DevJobs`;
  }, [total, currentPage]);

  return (
    <main>
      <SearchFormSection
        onChangeFilter={handleChangeFilter}
        initialFilters={filters}
      />
      {isLoading ? (
        <p style={{ textAlign: "center" }}>Cargando empleos...</p>
      ) : (
        <SearchResultsSection
          jobsData={jobs}
          total={total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          resultsPerPage={RESULTS_PER_PAGE}
        />
      )}
    </main>
  );
}
