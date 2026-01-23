const router = require("express").Router();
const specieController = require('../../controllers/specie.controller');


router.get('/select', specieController.getSpecieSelect);
router.get('/', specieController.getSpeciePage);
router.get('/:id', specieController.getSpecieById);

router.post('/',specieController.postSpecie);
router.put('/:id',specieController.editSpecie);
router.delete('/:id',specieController.deleteSpecie);


//End Point para obtener toda la info de la API "SWAPI"
//router.get('/swapi/import',specieController.getPlanetsFromSWAPI)

module.exports = router;


/* EJEMPLO, HomeWorld tiene que ir en String
{
    "name": "Wookies",
    "classification": "slaves",
    "designation": "Workers",
    "averageHeight": 70,
    "averageLifeSpan": 46,
    "eyeColor": [
        "blue"
    ],
    "hairColor": [
        "red",
        "brown"
    ],
    "skinColor": [
        "blue"
    ],
    "language": "Chinease",
    "homeworld": "697281b3f14d2f2599de8e34"
}
*/