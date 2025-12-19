export function useNewUrl({ filters, currentPage, RESULTS_PER_PAGE }) {
  const params = new URLSearchParams();
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
  if (RESULTS_PER_PAGE) {
    params.append("limit", RESULTS_PER_PAGE);
  }
  const offset = (currentPage - 1) * RESULTS_PER_PAGE;
  params.append("offset", offset);

  const queryParams = params.toString();

  const newUrl = queryParams
    ? `${window.location.pathname}?${queryParams}`
    : `${window.location.pathname}`;
  return { newUrl, queryParams };
}
