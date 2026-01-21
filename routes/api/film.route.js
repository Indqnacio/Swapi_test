const router = require("express").Router();

const Film = require("../../models/film.model");
//const filmCtrl = require('../../controllers/film.controller');


router.get('/', filmCtrl.getAllFilms);

// Devuelve un array (vacío por ahora) para que los tests que esperan Array pasen.
router.get("/", async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newFilm = await Film.create(req.body);
    res.json(newFilm);
  } catch (error) {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

module.exports = router;
