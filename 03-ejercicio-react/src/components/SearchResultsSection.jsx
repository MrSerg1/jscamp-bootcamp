import { JobListings } from "./JobsListings.jsx";
import { Pagination } from "./Pagination.jsx";

export function SearchResultsSection({jobsData, currentPage, onPageChange, total, resultsPerPage}) {
  const totalPages = Math.ceil(total / resultsPerPage);

  return (
    <section>
      <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>
      <JobListings jobs={jobsData} total={total} />
      <Pagination
        jobs={jobsData}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        total={total}
      />
    </section>
  );
}
