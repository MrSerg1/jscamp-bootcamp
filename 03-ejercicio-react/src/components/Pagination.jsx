export function Pagination({ totalPages, onPageChange, currentPage, total }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handlers
  const handleBackBtn = (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNextBtn = (event) => {
    event.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const handlePageClick = (event, page) => {
    event.preventDefault();
    onPageChange(page);
  };

  // Styles
  const styleback = {
    cursor: currentPage === 1 ? "not-allowed" : "pointer",
    opacity: currentPage === 1 ? 0.5 : 1,
    pointerEvents: currentPage === 1 ? "none" : "auto",
  };
  const styleNext = {
    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
    opacity: currentPage === totalPages ? 0.5 : 1,
    pointerEvents: currentPage === totalPages ? "none" : "auto",
  };

  // function to create the href pages

  const builPageUrl = (page) => {
    const url = new URL(window.location)
    url.searchParams.set("page", page)
    return `${url.pathname}?${url.searchParams.toString()}`
  }



  function PageNumbers() {
    return (
      <nav className="pagination">
        <a href={builPageUrl(currentPage -1)} onClick={handleBackBtn} style={styleback}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
          </svg>
        </a>
        {pages.map((page) => (
          <a
            key={page}
            data-page={page}
            href={builPageUrl(page)}
            className={page === currentPage ? "is-active" : ""}
            onClick={(event) => handlePageClick(event, page)}
          >
            {page}
          </a>
        ))}
        <a href={builPageUrl(currentPage + 1)} onClick={handleNextBtn} style={styleNext}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </a>
      </nav>
    );
  }

  return (
    <>
    {total > 0 ? (
        <PageNumbers />
          ) : (
            <></>
          )}
    </>
  )
}
