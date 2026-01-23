const router = require("express").Router();
const filmCtrl = require('../../controllers/film.controller');


router.get('/select', filmCtrl.getFilmsSelect);
router.get('/', filmCtrl.getFilmPage);
router.get('/:id', filmCtrl.getFilmById);

router.post('/',filmCtrl.postFilm);
router.put('/:id',filmCtrl.editFilm);
router.delete('/:id',filmCtrl.deleteFilm);


//End Point para obtener toda la info de la API "SWAPI"
router.get('/swapi/import',filmCtrl.getFilmsFromSWAPI)

module.exports = router;
