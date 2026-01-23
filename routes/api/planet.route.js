const router = require("express").Router();
const planetController = require('../../controllers/planet.controller');


router.get('/select', planetController.getPlanetSelect);
router.get('/', planetController.getPlanetPage);
router.get('/:id', planetController.getPlanetById);

router.post('/',planetController.postPlanet);
router.put('/:id',planetController.editPlanet);
router.delete('/:id',planetController.deleteFilm);


//End Point para obtener toda la info de la API "SWAPI"
router.get('/swapi/import',planetController.getPlanetsFromSWAPI)

module.exports = router;
