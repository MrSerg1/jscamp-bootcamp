import { Header } from "./components/Header.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { SearchResultsSection } from "./components/SearchResultsSection.jsx";
import { Footer } from "./components/Footer.jsx"

import jobsData from "./data.json";

import { useState } from "react";

function App() {

  const [ currentPage, setCurrentPage ] = useState(1);

  const [ filters, setFilters ] = useState({
    search: "",
    technology: "",
    location: "",
    experienceLvl: ""
  })

  const handleChangeFilter = (newFilters) => {
    setFilters(
      {
        search: newFilters.search,
        technology: newFilters.technology,
        location: newFilters.location,
        experienceLvl: newFilters.experienceLvl
      }
    );
    setCurrentPage(1);
  }
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //Array jobs filtrados
  const filteredJobs = jobsData.filter((job)=>
  {
    const matchesSearch = filters.search === "" || job.titulo.toLowerCase().includes(filters.search.toLowerCase())
    const matchesTechnology = filters.technology === "" || filters.technology === job.data.technology
    const matchesLocation = filters.location === "" || filters.location === job.data.modalidad
    const matchesExpLvl = filters.experienceLvl === "" || filters.experienceLvl === job.data.nivel
    return matchesSearch && matchesTechnology && matchesLocation && matchesExpLvl;
  })

  return (
    <>
      <Header />
      <main>
        <SearchFormSection onChangeFilter={handleChangeFilter} />
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
