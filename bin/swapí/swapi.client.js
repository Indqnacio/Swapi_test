const axios = require("axios");

const SWAPI_BASE = "https://swapi.info/api";

const swapiClient = axios.create({
  baseURL: SWAPI_BASE,
  timeout: 10000,
});

const getPlanets = async () => {
  const response = await axios.get(`${SWAPI_BASE}/planets`);
  return response.data;
};
module.exports = {
  getPlanets,
};

