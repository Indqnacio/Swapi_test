//RUTAS API
//sera el enrutador unico para las rutas de la API
const router= require('express').Router();

router.use('/films', require('./film.route'));
router.use('/characters', require('./character.route'));
router.use('/planets', require('./planet.route'));


module.exports = router;