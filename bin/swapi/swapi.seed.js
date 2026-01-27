const Planet = require("../../models/planet.model");
const { getPlanets } = require("./swapi.client");
const { mapPlanet } = require("./swapi.mappers");

const seedPlanets = async () => {
  try {
    const count = await Planet.countDocuments();

    if (count > 0) {
      console.log("coleccion con informacion (no se importará)");
      return;
    }

    console.log("Importando planets desde SWAPI...");

    // getPlanets devuelve espero yo todas las paginas
    const planets = await getPlanets();

    if (!Array.isArray(planets) || planets.length === 0) {
      console.log("No se obtuvieron planetas de SWAPI");
      return;
    }

    const normalized = planets.map(mapPlanet);

    await Planet.insertMany(normalized);
    console.log("Planets importados: ", normalized.length);
  } catch (err) {
    console.error("Error durante seedPlanets:", err.message || err);
  }
};

module.exports = {
  seedPlanets,
};