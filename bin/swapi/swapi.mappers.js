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

const mapPlanet = (data) => ({
  name: data.name ?? null,
  diameter: normalizeNumber(data.diameter) ?? null,
  rotationPeriod: normalizeNumber(data.rotation_period),
  orbitalPeriod: normalizeNumber(data.orbital_period),
  gravity: normalizeGravity(data.gravity),
  population: normalizeNumber(data.population),
  climate: normalizeArray(data.climate),
  terrain: normalizeArray(data.terrain),
  waterSurfacePer: normalizeNumber(data.surface_water),
  swapiUrl: data.url ?? null,
});

const mapFilm = (swapiFilm) => ({
  title: swapiFilm.title ?? null,
  director: swapiFilm.director ?? null,
  productor: normalizeArray(swapiFilm.producer),
  swapiUrl: swapiFilm.url ?? null,
});

//! este es el que falla mas 
const mapSpecie = (data) => ({
  name: data.name ?? null,
  classification: data.classification ?? null,
  designation: data.designation ?? null,
  averageHeight: normalizeNumber(data.average_height),
  averageLifeSpan: normalizeNumber(data.average_lifespan),
  eyeColor: normalizeArray(data.eye_colors),
  hairColor: normalizeArray(data.hair_colors),
  skinColor: normalizeArray(data.skin_colors),
  language: data.language ?? null,
  // homeworld en SWAPI viene como URL; no la guardamos en homeworld (ese campo
  // en el schema es ObjectId). Guardamos la URL en swapiHomeworld para resolver
  // la relación más tarde y dejamos homeworld vacío por ahora.
  homeworld: null,
  swapiHomeworld:data.homeworld ?? null,
  swapiUrl: data.url ?? null,
});

const mapStarship = (data) => ({
  name: data.name ?? null,
  model: data.model ?? null,
  starshipClass: data.starship_class ?? null,
  size: normalizeNumber(data.length),
  passangers: normalizeNumber(data.passengers),
  maxAtmosphericSpeed: normalizeNumber(data.max_atmosphering_speed),
  //! por que falla si no tiene un valor extraño??
  hyperdrive: normalizeNumber(data.hyperdrive_rating) ,
  MGLT: normalizeNumber(data.MGLT),
  weightCapacity: normalizeNumber(data.cargo_capacity),
  // solo es cosa de pasarlo a dias los años meses etc
  consumables: normalizeConsumables(data.consumables),
  swapiUrl: data.url ?? null,
});

const mapVehicle = (data) => ({
  name: data.name ?? null,
  model: data.model ?? null,
  vehicleClass: data.vehicle_class ?? null,
  size: normalizeNumber(data.length),
  passangers: normalizeNumber(data.passengers),
  maxAtmosphericSpeed: normalizeNumber(data.max_atmosphering_speed),
  weightCapacity: normalizeNumber(data.cargo_capacity),
  consumables: normalizeConsumables(data.consumables),
  swapiUrl: data.url ?? null,
});

const mapCharacter = (data) => ({
  name: data.name ?? null,
  birthDay: data.birth_year ?? null,
  gender: data.gender ?? null,
  height: normalizeNumber(data.height),
  mass: normalizeNumber(data.mass),
  hairColor: normalizeArray(data.hair_color),
  eyeColor: normalizeArray(data.eye_color),
  skinColor: normalizeArray(data.skin_color),
  //! debemos resolver esto luego
  swapiUrl: data.url ?? null,
  swapiHomeworld: data.homeworld ?? null,
  swapiFilms: Array.isArray(data.films) ? data.films : [],
  swapiSpecies: Array.isArray(data.species) ? data.species : [],
  swapiStarships: Array.isArray(data.starships) ? data.starships : [],
  swapiVehicles: Array.isArray(data.vehicles) ? data.vehicles : [],
});

module.exports = {
  mapPlanet,
  mapFilm,
  mapSpecie,
  mapStarship,
  mapVehicle,
  mapCharacter,
};
