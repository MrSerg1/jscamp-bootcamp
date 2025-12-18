   export function useNewUrl ({filters, currentPage}) {
       const params = new URLSearchParams()
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
    const queryParams = params.toString();
    
    const newUrl = queryParams?`${window.location.pathname}?${queryParams}`:`${window.location.pathname}`;
    return newUrl;
}