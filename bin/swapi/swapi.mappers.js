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

//! es batallaso trabajar con gravity
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
  // espero y convierta textos como "2 months", "6 years", "3 days" a número de días.

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
  // SWAPI usa "producer" (coma-separados cuando hay varios); lo guardamos tal cual
  productor: swapiFilm.producer ?? null,
  swapiUrl: swapiFilm.url ?? null,
});

module.exports = {
  mapPlanet,
};
