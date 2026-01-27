const Planet = require("../../models/planet.model");
const Film = require("../../models/film.model");
const Species = require("../../models/specie.model");
const Vehicle = require("../../models/vehicle.model");
const Starship = require("../../models/starship.model");
const Character = require("../../models/character.model");

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

    // getAllPages descarga todas las páginas del recurso 'planets'
    const planets = await getAllPages('planets');

    if (!Array.isArray(planets) || planets.length === 0) {
      console.log("No se obtuvieron planetas de SWAPI");
      return;
    }

    const normalized = planets.map(mapPlanet);
    await Planet.insertMany(normalized, { ordered: false });
    console.log("Planets importados: ", normalized.length);
  } catch (err) {
    console.error("Error durante seedPlanets:", err.message || err);
  }
};

module.exports = {
  seedPlanets,
};