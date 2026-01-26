const router = require("express").Router();
const planetController = require("../../controllers/planet.controller");

router.get(
  "/",
  /**
   * #swagger.tags = ['Planets']
   * #swagger.summary = 'obten los planetas paginados de 10 en 10'
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Planet" }
   *     }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Especie creada correctamente'
   * }
   */
  planetController.getPlanetPage,
);
router.get(
  "/select",
  /**
   * #swagger.tags = ['Planets']
   * #swagger.summary = 'obten todos los planetas pero solo su id y nombre para un select'
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Planet" }
   *     }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Especie creada correctamente'
   * }
   */
  planetController.getPlanetSelect,
);
router.get("/:id", planetController.getPlanetById);

router.post(
  "/",
  /**
   * #swagger.tags = ['Planets']
   * #swagger.summary = 'Crear un nuevo planeta'
   * #swagger.parameters['body'] = {
   *   in: 'body',
   *   required: true,
   *   schema: { $ref: "#/components/schemas/Planet" }
   * }
   * #swagger.responses[201] = {
   *   description: 'Planeta creado correctamente'
   * }
   */
  planetController.postPlanet
);

router.put(
  "/:id",
  /**
   * #swagger.tags = ['Planets']
   * #swagger.summary = 'Modificar un  planeta'
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Planet" }
   *     }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Planeta creada correctamente'
   * }
   */ planetController.editPlanet,
);
router.delete("/:id", 
      /**
   * #swagger.tags = ['Planets']
   * #swagger.summary = 'Eliminar un planeta'
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Planet" }
   *     }
   *   }
   * }
   * #swagger.responses[201] = {
   *   description: 'Planeta creada correctamente'
   * }
   */
    planetController.deleteFilm);

//End Point para obtener toda la info de la API "SWAPI"
router.get("/swapi/import", planetController.getPlanetsFromSWAPI);

module.exports = router;
