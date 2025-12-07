import { JobCard } from "./JobCard.jsx";

export function JobListings({jobs}) {
  return (
    <>
      {jobs.length > 0 ? (
        <div className="jobs-listings">
          
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p>No se han encontrado empleos que coincidan con los criterios de búsqueda.</p>
      )}
    </>
  );
}
