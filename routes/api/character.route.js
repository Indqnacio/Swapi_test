const router = require("express").Router();
const characterCtrl = require('../../controllers/character.controller');


router.get('/select', characterCtrl.getFilmsSelect);
router.get('/', characterCtrl.getFilmPage);
router.get('/:id', characterCtrl.getFilmById);

router.post('/',characterCtrl.postFilm);
router.put('/:id',characterCtrl.editFilm);
router.delete('/:id',characterCtrl.deleteFilm);


//End Point para obtener toda la info de la API "SWAPI"
//router.get('/swapi/import',characterCtrl.getFilmsFromSWAPI)

module.exports = router;
