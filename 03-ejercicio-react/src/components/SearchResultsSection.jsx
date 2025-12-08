import { JobListings } from "./JobsListings.jsx";
import { Pagination } from "./Pagination.jsx";

import { useState } from "react";

import jobsData from "../data.json";

const RESULTS_PER_PAGE = 4;

export function SearchResultsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE);
  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
      <JobListings jobs={pagedResults} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
