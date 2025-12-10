import { JobListings } from "./JobsListings.jsx";
import { Pagination } from "./Pagination.jsx";

import { useState } from "react";

const RESULTS_PER_PAGE = 4;

export function SearchResultsSection({jobsData, currentPage, onPageChange}) {
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE);
  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
      <JobListings jobs={pagedResults} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </section>
  );
}
