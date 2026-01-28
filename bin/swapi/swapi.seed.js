const {
  mapPlanet,
  mapFilm,
  mapSpecie,
  mapVehicle,
  mapStarship,
  mapCharacter,
} = require("./swapi.mappers");
const Characters = require("../../models/character.model");
const Starship = require("../../models/starship.model");
const Vehicle = require("../../models/vehicle.model");
const Species = require("../../models/specie.model");
const Planet = require("../../models/planet.model");
const { getAllPages } = require("./swapi.client");
const Film = require("../../models/film.model");
var countCharacter = 0;
var countSpecie = 0;

const seedPlanets = async () => {
  try {
    const count = await Planet.countDocuments();

    if (count > 0) {
      console.log("planetas ya tiene informacion");
      return;
    }

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
    if (count > 0) return console.log("species ya tiene informacion");
    const species = await getAllPages("species");

    if (!Array.isArray(species) || species.length === 0)
      return console.log("No se obtuvieron species");
    // No filtramos por classification no todos lo tienen
    // probare filtrar por nombre es mejor
    const normalized = species.map(mapSpecie).filter((s) => s.name);

    await Species.insertMany(normalized, { ordered: false });
    countSpecie++;
    //console.log(typeof normalized)
    console.log("Species importadas:", normalized.length);
  } catch (error) {
    console.error("Error durante seedSpecies:", error.message || error);
  }
};

const seedFilms = async () => {
  try {
    const count = await Film.countDocuments();
    if (count > 0) {
      return;
    }

    const films = await getAllPages("films");
    if (!Array.isArray(films) || films.length === 0)
      return console.log("No se obtuvieron informacion");
    const normalized = films.map(mapFilm).filter((f) => f.title);
    await Film.insertMany(normalized, { ordered: false });
    //esto es para debuggear
    console.log("Peliculas importadas:", normalized.length);
  } catch (error) {
    console.error("Error durante seedFilms:", error.message || error);
  }
};

const seedVehicle = async () => {
  try {
    const count = await Vehicle.countDocuments();
    if (count > 0) return console.log("vehiculos ya tiene informacion");

    const items = await getAllPages("vehicles");
    if (!Array.isArray(items) || items.length === 0)
      return console.log("No se obtuvieron vehicles");
    const normalized = items.map(mapVehicle).filter((v) => v.name && v.model);
    await Vehicle.insertMany(normalized, { ordered: false });
    console.log("Vehicles importados:", normalized.length);
  } catch (error) {
    console.error("Error durante seedVehicle:", error.message || error);
  }
};

const seedStarships = async () => {
  try {
    const count = await Starship.countDocuments();
    if (count > 0) return console.log("starships ya tiene informacion");

    const items = await getAllPages("starships");
    if (!Array.isArray(items) || items.length === 0)
      return console.log("No se obtuvieron starships");
    const normalized = items.map(mapStarship).filter((s) => s.name && s.model);
    await Starship.insertMany(normalized, { ordered: false });
    console.log("Starships importados:", normalized.length);
  } catch (error) {
    console.error("Error durante seedStarships:", error.message || error);
  }
};

const seedCharacters = async () => {
  try {
    const count = await Characters.countDocuments();
    if (count > 0) return console.log("personajes ya tiene informacion");

    const items = await getAllPages("people");
    if (!Array.isArray(items) || items.length === 0)
      return console.log("No se obtuvieron personajes");
    const normalized = items.map(mapCharacter).filter((c) => c.name);
    await Characters.insertMany(normalized, { ordered: false });
    countCharacter++;
    console.log("personajes importados:", normalized.length);
  } catch (error) {
    console.error("Error durante seedCharacters:", error.message || error);
  }
};

//! falta ver si falla una coleccion no afectara a las otras
const seedAll = async () => {
  const data = [
    seedPlanets(),
    seedFilms(),
    seedSpecies(),
    seedVehicle(),
    seedStarships(),
    seedCharacters(),
  ];

  const results = await Promise.allSettled(data);
  results.forEach((r, indice) => {
    if (r.status === "rechazado") {
      console.error(
        `Seed task ${indice} falló:`,
        r.reason && (r.reason.message || r.reason),
      );
    }
  });
  try {
    //? con esto evitamos que si ya teniamos info en la BD ejecute esto
    if (countCharacter > 0) await resolveRelations();
    if (countSpecie > 0) await  resolveSpeciesRelations();
  } catch (err) {
    console.error("Error en resolveRelations:", err.message || err);
  }
};

//Esto es para el endpoint de character
//tal vez lo tenga que refactorizar, por que tengo que hacer una segunda busqueda
const resolveRelations = async () => {
  const allCharacters = await getAllPages("people");

  for (const data of allCharacters) {
    // buscamos nuestro personaje por la URL
    const chr = await Characters.findOne({ swapiUrl: data.url });
    if (!chr) continue;

    const updates = {};

    if (data.homeworld) {
      const i = await Planet.findOne({ swapiUrl: data.homeworld });
      if (i) updates.homeworld = i._id;
    }

    if (Array.isArray(data.species) && data.species.length) {
      const specIds = [];
      for (const url of data.species) {
        const s = await Species.findOne({ swapiUrl: url });
        if (s) specIds.push(s._id);
      }
      updates.species = specIds;
    }

    if (Array.isArray(data.films) && data.films.length) {
      const filmIds = [];
      for (const url of data.films) {
        const f = await Film.findOne({ swapiUrl: url });
        if (f) filmIds.push(f._id);
      }
      updates.films = filmIds;
    }

    if (Array.isArray(data.starships) && data.starships.length) {
      const shipIds = [];
      for (const url of data.starships) {
        const sh = await Starship.findOne({ swapiUrl: url });
        if (sh) shipIds.push(sh._id);
      }
      updates.starships = shipIds;
    }

    if (Array.isArray(data.vehicles) && data.vehicles.length) {
      const vehIds = [];
      for (const url of data.vehicles) {
        const v = await Vehicle.findOne({ swapiUrl: url });
        if (v) vehIds.push(v._id);
      }
      updates.vehicles = vehIds;
    }
    if (Object.keys(updates).length) {
      await Characters.updateOne({ _id: chr._id }, { $set: updates });
    }
  }
};

const resolveSpeciesRelations = async () => {
  debugger;
  // Buscamos todas las species que tengan swapiHomeworld definido
  const speciesHome = await Species.find({
    swapiUrl: { $exists: true, $ne: null },
  });

  for (const obj of speciesHome) {
    try {
      const planet = await Planet.findOne({ swapiUrl: obj.swapiHomeworld });
      if (planet) {
        await Species.updateOne(
          { _id: obj._id },
          { $set: { homeworld: planet._id } },
        );
      } else {
        console.log(
          `No se encontro el planeta de la especie ${obj.name}: ${obj.swapiHomeworld}`,
        );
      }
    } catch (err) {
      console.error(`Error en ${obj.name}:`, err.message || err);
    }
  }
};

module.exports = {
  seedPlanets,
  seedFilms,
  seedSpecies,
  seedStarships,
  seedCharacters,
  seedAll,
};
