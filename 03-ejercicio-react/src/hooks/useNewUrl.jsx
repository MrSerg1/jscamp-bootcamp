
// cuando escribimos una variable en mayuscula y separada en `snake_case` es porque es una constante. Aquí hay dos alternativas:
// 1. pasar `RESULTS_PER_PAGE` a resultsPerPage para mantener la nomenclatura de camelCase en las variables que se pasan por parámetro.
// 2. Crear un archivo de config con la constante RESULTS_PER_PAGE y usarla en donde sea necesario. Aquí y en el componente Search, sin pasarla como parámetro.
export function useNewUrl({ filters, currentPage, resultsPerPage }) {
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
  if (resultsPerPage) {
    params.append("limit", resultsPerPage);
  }

  // podemos hacer esto para asegurarnos de que el currentPage nunca sea me
  const offset = (Math.max(currentPage, 1) - 1) * resultsPerPage;
  params.append("offset", offset);

  const queryParams = params.toString();

  const newUrl = queryParams
    ? `${window.location.pathname}?${queryParams}`
    : `${window.location.pathname}`;
  return { newUrl, queryParams };
}
