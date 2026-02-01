import { useRouter } from "../hooks/useRouter.jsx";
import snarkdown from "snarkdown";
import styles from "./Detail.module.css";
import { useEffect, useState } from "react";
import { Link } from "../components/Link.jsx";

function JobSection({ title, content }) {
  const html = snarkdown(content);

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div
        className={styles.sectionContent}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

function DetailPageBreadCrumb({ job }) {
  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumb}>
        <Link href="/search" className={styles.breadcrumbButton}>
          empleos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
      </nav>
    </div>
  );
}

function DetailPageHeader({ job }) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>{job.titulo}</h1>
        <p className={styles.meta}>
          {job.empresa} · {job.ubicacion}
        </p>
      </header>

      <DetailApplyButton />
    </>
  );
}

function DetailApplyButton() {
  return <button className={styles.applyButton}>Aplicar ahora</button>;
}

export function JobDetail() {
  const { params } = useRouter();
  const navigateTo = useRouter();
  const id = params.id;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`).then((response) => {
      if (!response.ok) {
        navigateTo("/search");
      }
      return response
        .json()
        .then((json) => {
          setJob(json);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [id]);
  if (loading) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando...</p>
        </div>
      </div>
    );
  }
   if (error || !job) {
    return (
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>
            Oferta no encontrada
          </h2>
          <button
            onClick={() => navigate('/')}
            className={styles.errorButton}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className={styles.detailPage}>
        <DetailPageBreadCrumb job={job} />
        <DetailPageHeader job={job} />
        <JobSection title="Descripción del puesto" content={job.descripcion} />
        <JobSection title="Responsabilidades" content={job.content.responsibilities} />
        <JobSection title="Requisitos" content={job.content.requirements} />
        <JobSection title="Acerca de la empresa" content={job.content.about} />
    </div>
  )
}
