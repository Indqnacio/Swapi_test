const router = require("express").Router();

const Film = require("../../models/film.model");
const filmCtrl = require('../../controllers/film.controller');


router.get('/', filmCtrl.getAllFilms);
router.post('/',filmCtrl.postFilm)

module.exports = router;
