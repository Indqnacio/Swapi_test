const router = require("express").Router();
const planetController = require("../../controllers/planet.controller");

router.get("/", planetController.getPlanetPage);
router.get("/select", planetController.getPlanetSelect);
router.get("/:id", planetController.getPlanetById);

router.post("/", planetController.postPlanet);

router.put("/:id", planetController.editPlanet);
router.delete("/:id", planetController.deleteFilm);

module.exports = router;
