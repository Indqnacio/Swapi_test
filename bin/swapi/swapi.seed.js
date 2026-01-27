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
      console.log("la colecion planetas ya tiene informacion");
      return;
    }

    console.log("importando planets desde SWAPI");

    // getAllPages descarga todas las páginas del recurso 'planets'
    const planets = await getAllPages("planets");

    if (!Array.isArray(planets) || planets.length === 0) {
      console.log("No se obtuvieron planetas de SWAPI");
      return;
    }

    const res = planets.map(mapPlanet);
    await Planet.insertMany(res, { ordered: false });
    console.log("Planetas importados: ", res.length);
  } catch (error) {
    console.error("Error durante el get a Planets:", error.message || err);
  }
};

const seedSpecies = async () => {
  try {
    const count = await Species.countDocuments();
    if (count > 0)
      return console.log("la colecion planetas ya tiene informacion");
    console.log("Importando species");
    const items = await getAllPages("species");
    if (!Array.isArray(items) || items.length === 0)
      return console.log("No se obtuvieron species");
    // No filtramos por classification no todos lo tienen
    // probare filtrar por nombre es mejor
    const normalized = items.map(mapSpecie).filter((s) => s.name);
    await Species.insertMany(normalized, { ordered: false });
    console.log("Species importadas:", normalized.length);
  } catch (error) {
    console.error("Error durante seedSpecies:", error.message || error);
  }
};

const seedCharacters = async () => {
  try {
    //! tengo que ver como resolver las relations por ejemplo de films
  } catch (error) {
    console.error("Error durante seedCharacters:", error.message || error);
  }
};

//! falta ver si falla una coleccion no afectara a las otras
const seedAll = async () => {
  const data = [seedPlanets(), seedSpecies()];

  const results = await Promise.allSettled(data);
  results.forEach((r, idx) => {
    if (r.status === "rechazado") {
      console.error(
        `Seed task ${idx} falló:`,
        r.reason && (r.reason.message || r.reason),
      );
    }
  });

  try {
    await resolveRelations();
  } catch (err) {
    console.error("Error en resolveRelations:", err.message || err);
  }
};
//Esto es para el endpoint de character
const resolveRelations = async () => {
  const swapi = await getAllPages("people");
  for (const data of swapiPeople) {
    // buscamos nuestro character por la URL original (swapiUrl)
    const chr = await Character.findOne({ swapiUrl: data.url });
    if (!chr) continue;

    const updates = {};

    if (data.homeworld) {
      const i = await Planet.findOne({ swapiUrl: data.homeworld });
      if (i) updates.homeworld = i._id;
    }
    if (Array.isArray(sp.species) && sp.species.length) {
      const specIds = [];
      for (const url of sp.species) {
        const s = await Species.findOne({ swapiUrl: url });
        if (s) specIds.push(s._id);
      }
      updates.species = specIds;
    }

    if (Object.keys(updates).length) {
      await Character.updateOne({ _id: chr._id }, { $set: updates });
    }
  }
};

module.exports = {
  seedPlanets,
  seedSpecies,
  seedCharacters,
  seedAll,
};
