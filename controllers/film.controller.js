// controllers/film.controller.js
const Film = require('../models/film.model');

exports.getAllFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo films' });
  }
};
