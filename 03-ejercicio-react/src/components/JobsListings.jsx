import { JobCard } from "./JobCard.jsx";
import jobsData from "../data.json";


export function JobListings() {
  return (
    <>
      {jobsData.length > 0 ? (
        <div className="jobs-listings">
          {jobsData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <p>No se han encontrado empleos que coincidan con los criterios de búsqueda.</p>
      )}
    </>
  );
}
