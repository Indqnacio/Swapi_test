const router = require("express").Router();
const specieController = require('../../controllers/species.controller');


router.get('/select', specieController.getSpecieSelect);
router.get('/', specieController.getSpeciePage);
router.get('/:id', specieController.getSpecieById);

router.post('/',specieController.postSpecie);
router.put('/:id',specieController.editSpecie);
router.delete('/:id',specieController.deleteSpecie);


//End Point para obtener toda la info de la API "SWAPI"
//router.get('/swapi/import',specieController.getPlanetsFromSWAPI)

module.exports = router;
