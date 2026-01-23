//RUTAS API
//sera el enrutador unico para las rutas de la API
const router= require('express').Router();

router.use('/films', require('./film.route'));
router.use('/planets', require('./planet.route'));
router.use('/starships', require('./starship.route'));
/*
router.use('/characters', require('./character.route'));
*/

module.exports = router;