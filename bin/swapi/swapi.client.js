const axios = require("axios");

// Usamos la API pública oficial de SWAPI
const SWAPI_BASE = "https://swapi.dev/api";

const swapiClient = axios.create({
  baseURL: SWAPI_BASE,
  timeout: 10000,
});

/**
 * getPlanets
 * - Descarga todas las páginas de /planets/
 * - Devuelve un array con todos los planetas (cada entry como el objeto SWAPI original)
 */
const getPlanets = async () => {
  const allPlanets = [];
  let next = `${SWAPI_BASE}/planets/`;

  try {
    while (next) {
      const res = await axios.get(next); // puede ser URL absoluta o relativa
      const data = res.data;
      // API SWAPI estándar devuelve { count, next, previous, results: [...] }
      if (Array.isArray(data.results)) {
        allPlanets.push(...data.results);
        next = data.next; // data.next es URL absoluta o null
      } else if (Array.isArray(data)) {
        // fallback si alguna vez devuelve un array directamente
        allPlanets.push(...data);
        break;
      } else {
        break;
      }
    }
  } catch (err) {
    console.error("Error al descargar planets desde SWAPI:", err.message || err);
    throw err;
  }

  return allPlanets;
};

module.exports = {
  getPlanets,
};