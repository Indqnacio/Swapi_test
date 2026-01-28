const router = require("express").Router();
const vehiclesController = require('../../controllers/vehicle.controller');

router.get('/', vehiclesController.getVehiclePage);
router.get('/select', vehiclesController.getVehicleSelect);
router.get('/:id', vehiclesController.getVehicleById);

router.post('/',vehiclesController.postVehicles);
router.put('/:id',vehiclesController.editVehicle);
router.delete('/:id',vehiclesController.deleteVehicle);

module.exports = router;