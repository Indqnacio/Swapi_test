const router = require("express").Router();

const Film = require("../../models/film.model");
const filmCtrl = require('../../controllers/film.controller');


router.get('/id', filmCtrl.getFilmById);
router.get('/select', filmCtrl.getFilmByNameId);
router.get('/', filmCtrl.getFilmPage);
router.post('/',filmCtrl.postFilm);
router.post('/id',filmCtrl.editFilm);
router.post('/id',filmCtrl.deleteFilm);

module.exports = router;
