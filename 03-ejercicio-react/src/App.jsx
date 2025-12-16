import { Header } from "./components/Header.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { SearchResultsSection } from "./components/SearchResultsSection.jsx";
import { Footer } from "./components/Footer.jsx";


import jobsData from "./data.json";

import { useState,useEffect } from "react";
import { useRouter } from "./hooks/useRouter.jsx";

function App() {
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


  useEffect(() => {

    const params = new URLSearchParams()

    if (filters.search) {
      params.append("text", filters.search);
    }
    if (filters.technology) {
      params.append("technology", filters.technology);
    }
    if (filters.location) {
      params.append("type", filters.location);
    }
    if (filters.experienceLvl) {
      params.append("level", filters.experienceLvl);
    }
    if (currentPage > 1) {
      params.append("page", currentPage);
    }
    const queryParams = params.toString();

    const newUrl = queryParams?`${window.location.pathname}?${queryParams}`:`${window.location.pathname}`;

    navigateTo(newUrl);
  }, [filters, navigateTo, currentPage]);

  //Array jobs filtrados
  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      filters.search === "" ||
      job.titulo.toLowerCase().includes(filters.search.toLowerCase());
    const matchesTechnology =
      filters.technology === "" || filters.technology === job.data.technology;
    const matchesLocation =
      filters.location === "" || filters.location === job.data.modalidad;
    const matchesExpLvl =
      filters.experienceLvl === "" || filters.experienceLvl === job.data.nivel;
    return (
      matchesSearch && matchesTechnology && matchesLocation && matchesExpLvl
    );
  });

  return (
    <>
      <Header />
      <main>
        <SearchFormSection 
        onChangeFilter={handleChangeFilter} 
        initialFilters={filters}
        />
        <SearchResultsSection
          jobsData={filteredJobs}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
