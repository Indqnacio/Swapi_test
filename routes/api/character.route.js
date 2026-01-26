const router = require("express").Router();
const characterCtrl = require("../../controllers/character.controller");

router.get(
  "/select",
  /**
   * #swagger.tags = ['Characters']
   * #swagger.summary = 'obten todos los personajes pero solo su id y nombre para un select'
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Specie" }
   *     }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Especie creada correctamente'
   * }
   */
  characterCtrl.getCharacterSelect,
);
router.get(
  "/:id",
  /**
   * #swagger.tags = ['Characters']
   * #swagger.summary = 'busca un personaje por su Id'
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Specie" }
   *     }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Especie creada correctamente'
   * }
   */
  characterCtrl.getCharacterById,
);
router.get(
  "/",
  /**
   * #swagger.tags = ['Characters']
   * #swagger.summary = 'busca los personajes por paginas'
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Specie" }
   *     }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Especie creada correctamente'
   * }
   */
  characterCtrl.getCharacterPage,
);

router.post(
  "/",
  /**
   * #swagger.tags = ['Characters']
   * #swagger.summary = 'Crear un personaje desde 0'
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Specie" }
   *     }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Especie creada correctamente'
   * }
   */
  characterCtrl.postCharacter,
);
router.put("/:id", characterCtrl.editCharacter);
router.delete("/:id", characterCtrl.deleteCharacter);

//End Point para obtener toda la info de la API "SWAPI"
//router.get('/swapi/import',characterCtrl.getFilmsFromSWAPI)

module.exports = router;
