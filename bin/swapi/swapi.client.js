const axios = require("axios");

const SWAPI_BASE = "https://swapi.info/api";

// trae todos los datos de la coleccion que le pasemos
const getAllPages = async (data) => {
  if (!data) throw new Error('No hay informacion, no se traera informacion');
 const allPages = [];
  let next = `${SWAPI_BASE}/${resource}/`;

  try {
    while (next) {
      // aqui hacemos la llamada a la API
      const res = await axios.get(next);
      const data = res.data;
      //falta ver por que realmente es necesario que tengan esos tres puntos las variables 
      if (data && Array.isArray(data.results)) {
        allPages.push(...data.results);
        next = data.next;
      } else if (Array.isArray(data)) {
        // por si acaso falla devolver algo
        allPages.push(...data);
        break;
      } else {
        break;
      }
    }
  } catch (err) {
    console.error(`Error descargando ${resource} desde SWAPI:`, err.message || err);
    throw err;
  }

  return allPages;
};

module.exports = {
  getAllPages,
};