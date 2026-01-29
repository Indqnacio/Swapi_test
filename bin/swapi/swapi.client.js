//! Este es el que se conecta a la API, si es bastante importante
//! Lo ideal seria tenerla en el .env pero por efectos practicas si la pondre aqui
const SWAPI_BASE = process.env.SWAPIURL || "https://swapi.info/api";
const axios = require("axios");

// trae todos los datos de la coleccion que le pasemos para no repetir codigo, es mejor que sea modular
const getAllPages = async (typeData) => {
  if (!typeData) throw new Error('No se especifico el tipo de dato, no se continuara con '+ typeData);
 const allPages = [];
  let next = `${SWAPI_BASE}/${typeData}/`;

  try {
    while (next) {

      //? aqui hacemos la llamada a la API
      const res = await axios.get(next);
      const data = res.data;

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
    console.error(`Error descargando ${typeData} desde SWAPI:`, err.message || err);
    throw err;
  }

  return allPages;
};

module.exports = {
  getAllPages,
};