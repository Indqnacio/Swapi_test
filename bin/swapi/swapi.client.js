const axios = require("axios");

const SWAPI_BASE = "https://swapi.info/api";

const swapiClient = axios.create({
  baseURL: SWAPI_BASE,
  timeout: 10000,
});

/**
  * Esto debe ser mas modular asi no me sirve
 */
const getAllPages = async (data) => {
  if (!data) throw new Error('No hay informacion, no se traera informacion');
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
  getAllPages,
};