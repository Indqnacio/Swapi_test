const router = require("express").Router();

const Film = require("../../models/film.model");

// Devuelve un array (vacío por ahora) para que los tests que esperan Array pasen.
router.get("/", async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch {
    res.status(500).json({ error: "Ha ocurrido un error" });
  }
});

router.post('/',  (req,res)=>{
  res.json('Texto Random');
})

module.exports = router;
 