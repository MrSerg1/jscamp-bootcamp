import { useState } from "react";
import { Link } from "./Link.jsx";
import { useFavoritesStore } from "../store/favoriteStore.js";
import { ApplyButton } from "./Applybtn.jsx";

export function JobCard({ job }) {
 
  const Fstar = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="favorite-svg"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" />
      </svg>
    );
  };

  const Estar = () => {
    return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="favorite-svg"  
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245" />
    </svg>
    );
  };

  const { isFavorite, toggleFavorite } = useFavoritesStore();

  function FavButton({ jobId }) {
    const isJobFavorite = isFavorite(jobId);
    return isJobFavorite ? (
      <button className="button-favorite" onClick={() => toggleFavorite(jobId)}><Fstar /></button>
    ) : (
      <button className="button-favorite" onClick={() => toggleFavorite(jobId)}>
        <Estar />
      </button>
    );
  }

  return (
    <article
      className="job-listing-card"
      data-modalidad={job.data.modalidad}
      data-nivel={job.data.nivel}
      data-technology={job.data.technology}
    >
      <div>
        <h3>{job.titulo}</h3>
        <small>
          {job.empresa} | {job.ubicacion}
        </small>
        <p>{job.descripcion}</p>
      </div>
      <div className="job-card-actions">
        <FavButton jobId={job.id} />
        <ApplyButton />
        <Link to={`/job/${job.id}`} className="link-details">
          Ver detalles
        </Link>
      </div>
    </article>
  );
}
