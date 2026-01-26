const Planet = require("../../models/planet.model");
const { getPlanets } = require("./swapi.client");
const { mapPlanet } = require("./swapi.mappers");

const seedPlanets = async () => {
  const count = await Planet.countDocuments();

  if (count > 0) {
    console.log("coleccion con informacion");
    return;
  }

  console.log("importar planets desde SWAPI");

  const { data } = await getPlanets();

  const normalized = data.map(mapPlanet);

  await Planet.insertMany(normalized);

  console.log("Planets importados");
};

module.exports = {
  seedPlanets,
};
