const router = require("express").Router();
const starShipController = require('../../controllers/starShip.controller');


router.get('/', starShipController.getStarShipPage);
router.get('/select', starShipController.getStarShipSelect);
router.get('/:id', starShipController.getStarShipById);

router.post('/',starShipController.postStarShip);
router.put('/:id',starShipController.editStarShip);
router.delete('/:id',starShipController.deleteStarShip);


//End Point para obtener toda la info de la API "SWAPI"
//router.get('/swapi/import',starShipController.getStarShipsFromSWAPI)

module.exports = router;
