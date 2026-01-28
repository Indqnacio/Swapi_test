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
   * #swagger.summary = 'Crear un personaje desde 10000'
   * #swagger.parameters['body'] = {
   *     in: 'body',
         description: 'Datos del usuario',
   *   schema: {
        $name: 'Juan',
        $age: 30
    }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Especie creada correctamente'
   * }
   */
  characterCtrl.postCharacter,
);
router.put(
  "/:id",
  /**
   * #swagger.tags = ['Characters']
   * #swagger.summary = 'Editar un personaje (reemplazo completo)'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.parameters['body'] = {
   *   in: 'body',
   *   required: true,
   *   schema: { $ref: '#/definitions/Specie' }
   * }
   * #swagger.responses[200] = {
   *   description: 'Especie actualizada'
   * }
   */
  characterCtrl.editCharacter,
);
router.delete(
  "/:id",
  /**
   * #swagger.tags = ['Characters']
   * #swagger.summary = 'Eliminar Personaje'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.responses[200] = {
   *   description: 'Personaje eliminado'
   * }
   */
  characterCtrl.deleteCharacter,
);

module.exports = router;
