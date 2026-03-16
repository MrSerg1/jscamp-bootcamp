static async getAll({ title, text, level, technology }) {
  // 1. Definimos los criterios de búsqueda de forma limpia
  const filters = [
    { active: title, check: 
    (j) => j.titulo.toLowerCase().includes(title.toLowerCase()) },
    { active: text,  check: 
    (j) => j.titulo.toLowerCase().includes(text.toLowerCase()) || 
                                   j.descripcion.toLowerCase().includes(text.toLowerCase()) },
    { active: level, check: 
    (j) => j.data.nivel.toLowerCase().includes(level.toLowerCase()) },
    { active: technology, check: 
    (j) => j.data.technology.some(t => t.toLowerCase() === technology.toLowerCase()) }
  ];

  // 2. Filtramos en un solo paso
  return jobs.filter(job => {
    // .every() devuelve true solo si todas las condiciones activas se cumplen
    return filters
      .filter(f => f.active) // Solo nos importan los filtros que el usuario envió
      .every(f => f.check(job)); // El trabajo debe pasar cada prueba
  });
}