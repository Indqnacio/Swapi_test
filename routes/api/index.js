//RUTAS API
//sera el enrutador unico para las rutas de la API
const router= require('express').Router();

router.use('/films', require('./film.route'))

module.exports = router;