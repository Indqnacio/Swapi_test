//! solo para darle formato a nuestros datos en caso de no ser validos
const normalizeNumber = (value) => {
  if (!value || value === "unknown" || value === "n/a") return null;
  const num = Number(value.replace(/,/g, ""));
  return isNaN(num) ? null : num;
};

const normalizeArray = (value) => {
  if (!value || value === "unknown" || value === "n/a") return [];
  return value.split(",").map(v => v.trim());
};

//? es batallaso trabajar con gravity probar que si funciona
const normalizeGravity = (gravity) => {
  if (!gravity || gravity === "unknown") return [];

//? "1 standard" en teoria debe funcionar separandolos en dos
  const match = gravity.match(/([\d.]+)\s*(.*)/);

  if (!match) return [];

  return [{
    value: Number(match[1]),
    description: match[2] || "standard",
  }];
};

const normalizeConsumables = (value) => {
  if (!value || value === 'unknown' || value === 'n/a') return null;

  // Pasamos todos los datos a dias para mejor entendimiento
  const m = String(value).trim().toLowerCase().match(/(\d+)\s*(year|years|month|months|week|weeks|day|days)/);
  if (!m) return null;

  const num = Number(m[1]);
  const unit = m[2];
  if (isNaN(num)) return null;

  switch (unit) {
    case 'year':
    case 'years':
      return num * 365;
    case 'month':
    case 'months':
      return num * 30;
    case 'week':
    case 'weeks':
      return num * 7;
    case 'day':
    case 'days':
      return num;
    default:
      return null;
  }
}

const mapPlanet = (swapiPlanet) => ({
  name: swapiPlanet.name ?? null,
  diameter: normalizeNumber(swapiPlanet.diameter) ?? null,
  rotationPeriod: normalizeNumber(swapiPlanet.rotation_period),
  orbitalPeriod: normalizeNumber(swapiPlanet.orbital_period),
  gravity: normalizeGravity(swapiPlanet.gravity),
  population: normalizeNumber(swapiPlanet.population),
  climate: normalizeArray(swapiPlanet.climate),
  terrain: normalizeArray(swapiPlanet.terrain),
  waterSurfacePer: normalizeNumber(swapiPlanet.surface_water),
  swapiUrl: swapiPlanet.url ?? null,
});

const mapFilm = (swapiFilm) => ({
  title: swapiFilm.title ?? null,
  director: swapiFilm.director ?? null,
  productor: normalizeArray(swapiFilm.producer),
  swapiUrl: swapiFilm.url ?? null,
});

//! este es el que falla mas 
const mapSpecie = (swapiSpecie) => ({
  name: swapiSpecie.name ?? null,
  classification: swapiSpecie.classification ?? null,
  designation: swapiSpecie.designation ?? null,
  averageHeight: normalizeNumber(swapiSpecie.average_height),
  averageLifeSpan: normalizeNumber(swapiSpecie.average_lifespan),
  eyeColor: normalizeArray(swapiSpecie.eye_colors),
  hairColor: normalizeArray(swapiSpecie.hair_colors),
  skinColor: normalizeArray(swapiSpecie.skin_colors),
  language: swapiSpecie.language ?? null,
  // homeworld se guarda como URL y ya luego nos preocupamos para buscarlo bien 
  homeworld: swapiSpecie.homeworld ?? null,
  swapiUrl: swapiSpecie.url ?? null,
});

const mapStarship = (swapiShip) => ({
  name: swapiShip.name ?? null,
  model: swapiShip.model ?? null,
  starshipClass: swapiShip.starship_class ?? null,
  size: normalizeNumber(swapiShip.length),
  passangers: normalizeNumber(swapiShip.passengers),
  maxAtmosphericSpeed: normalizeNumber(swapiShip.max_atmosphering_speed),
  hyperdrive: swapiShip.hyperdrive_rating ?? null,
  MGLT: normalizeNumber(swapiShip.MGLT),
  weightCapacity: normalizeNumber(swapiShip.cargo_capacity),
  // solo es cosa de pasarlo a dias los años meses etc
  consumables: normalizeConsumables(swapiShip.consumables),
  swapiUrl: swapiShip.url ?? null,
});

const mapVehicle = (swapiVehicle) => ({
  name: swapiVehicle.name ?? null,
  model: swapiVehicle.model ?? null,
  vehicleClass: swapiVehicle.vehicle_class ?? null,
  size: normalizeNumber(swapiVehicle.length),
  passangers: normalizeNumber(swapiVehicle.passengers),
  maxAtmosphericSpeed: normalizeNumber(swapiVehicle.max_atmosphering_speed),
  weightCapacity: normalizeNumber(swapiVehicle.cargo_capacity),
  consumables: normalizeConsumables(swapiVehicle.consumables),
  swapiUrl: swapiVehicle.url ?? null,
});

const mapCharacter = (swapiChar) => ({
  name: swapiChar.name ?? null,
  birthDay: swapiChar.birth_year ?? null,
  gender: swapiChar.gender ?? null,
  height: normalizeNumber(swapiChar.height),
  mass: normalizeNumber(swapiChar.mass),
  hairColor: normalizeArray(swapiChar.hair_color),
  eyeColor: normalizeArray(swapiChar.eye_color),
  skinColor: normalizeArray(swapiChar.skin_color),
  //! debemos resolver esto luego
  swapiUrl: swapiChar.url ?? null,
  swapiHomeworld: swapiChar.homeworld ?? null,
  swapiFilms: Array.isArray(swapiChar.films) ? swapiChar.films : [],
  swapiSpecies: Array.isArray(swapiChar.species) ? swapiChar.species : [],
  swapiStarships: Array.isArray(swapiChar.starships) ? swapiChar.starships : [],
  swapiVehicles: Array.isArray(swapiChar.vehicles) ? swapiChar.vehicles : [],
});

module.exports = {
  mapPlanet,
  mapFilm,
  mapSpecie,
  mapStarship,
  mapVehicle,
  mapCharacter,
};
