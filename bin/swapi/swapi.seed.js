const Character = require("../../models/character.model");
const Starship = require("../../models/starship.model");
const Vehicle = require("../../models/vehicle.model");
const Species = require("../../models/specie.model");
const Planet = require("../../models/planet.model");
const {getAllPages} = require("./swapi.client");
const Film = require("../../models/film.model");

const {
  mapPlanet,
  mapFilm,
  mapSpecie,
  mapVehicle,
  mapStarship,
  mapCharacter,
} = require("./swapi.mappers");

const seedPlanets = async () => {
  try {
    const count = await Planet.countDocuments();

    if (count > 0) {
      console.log("planetas ya tiene informacion");
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
      return console.log("species ya tiene informacion");
    console.log("importando species");

    const species = await getAllPages("species");

    if (!Array.isArray(species) || species.length === 0)
      return console.log("No se obtuvieron species");
    // No filtramos por classification no todos lo tienen
    // probare filtrar por nombre es mejor
    const normalized = species.map(mapSpecie).filter((s) => s.name);
    await Species.insertMany(
[
  {
    name: 'Human',
    classification: 'mammal',
    designation: 'sentient',
    averageHeight: 180,
    averageLifeSpan: 120,
    eyeColor: [ 'brown', 'blue', 'green', 'hazel', 'grey', 'amber' ],
    hairColor: [ 'blonde', 'brown', 'black', 'red' ],
    skinColor: [ 'caucasian', 'black', 'asian', 'hispanic' ],
    language: 'Galactic Basic',
    homeworld: 'https://swapi.info/api/planets/9',
    swapiUrl: 'https://swapi.info/api/species/1'
  },
  {
    name: 'Droid',
    classification: 'artificial',
    designation: 'sentient',
    averageHeight: null,
    averageLifeSpan: null,
    eyeColor: [],
    hairColor: [],
    skinColor: [],
    language: 'n/a',
    homeworld: null,
    swapiUrl: 'https://swapi.info/api/species/2'
  },
  {
    name: 'Wookie',
    classification: 'mammal',
    designation: 'sentient',
    averageHeight: 210,
    averageLifeSpan: 400,
    eyeColor: [ 'blue', 'green', 'yellow', 'brown', 'golden', 'red' ],
    hairColor: [ 'black', 'brown' ],
    skinColor: [ 'gray' ],
    language: 'Shyriiwook',
    homeworld: 'https://swapi.info/api/planets/14',
    swapiUrl: 'https://swapi.info/api/species/3'
  },
  {
    name: 'Rodian',
    classification: 'sentient',
    designation: 'reptilian',
    averageHeight: 170,
    averageLifeSpan: null,
    eyeColor: [ 'black' ],
    hairColor: [],
    skinColor: [ 'green', 'blue' ],
    language: 'Galatic Basic',
    homeworld: 'https://swapi.info/api/planets/23',
    swapiUrl: 'https://swapi.info/api/species/4'
  }
]


    )
    //await Species.insertMany(normalized, { ordered: false });
    console.log("Species importadas:", normalized.length);
    console.log(typeof normalized)
    //console.log("Estas son las especies que se obtuvieron: ", normalized)
  } catch (error) {
    console.error("Error durante seedSpecies:", error.message || error);
  }
};

const seedFilms = async () => {
  try {
    const count = await Film.countDocuments();
    if (count > 0) {
      console.log("peliculas ya tiene informacion");
      return;
    }

    console.log("importando peliculas desde SWAPI");
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
    if (count > 0)
      return console.log("vehiculos ya tiene informacion");
    console.log("importando vehiculos desde SWAP");
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
    if (count > 0)
      return console.log(
        "starships ya tiene informacion",
      );
    console.log("Importando starships desde SWAPI");
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
    const count = await Character.countDocuments();
    if (count > 0)
      return console.log(
        "personajes ya tiene informacion",
      );
    console.log("importando personajes desde SWAPI");

    const items = await getAllPages("people");
    if (!Array.isArray(items) || items.length === 0)
      return console.log("No se obtuvieron personajes");
    const normalized = items.map(mapCharacter).filter((c) => c.name);
    await Character.insertMany(normalized, { ordered: false });
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
    await resolveRelations();
  } catch (err) {
    console.error("Error en resolveRelations:", err.message || err);
  }
};

//Esto es para el endpoint de character
const resolveRelations = async () => {
  const allCharacters = await getAllPages("people");

  for (const data of allCharacters) {
    // buscamos nuestro character por la URL original
    const chr = await Character.findOne({ swapiUrl: data.url });
    if (!chr) continue;

    const updates = {};

    if (data.homeworld) {
      console.log(data.homeworld + " Aqui tenemos el homeworld por si sirve de algo");
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
      await Character.updateOne({ _id: chr._id }, { $set: updates });
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
