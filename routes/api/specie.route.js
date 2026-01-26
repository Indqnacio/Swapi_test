const router = require("express").Router();
const controller = require("../../controllers/specie.controller.js");


router.get(
  '/select',
  /**
   * #swagger.tags = ['Species']
   * #swagger.summary = 'Listar especies por id y nombre'
   * #swagger.responses[200] = {
   *   description: 'Lista de especies'
   * }
  */
 controller.getSpecieSelect
);

router.get(
  '/',
  /**
   * #swagger.tags = ['Species']
   * #swagger.summary = 'Listar especies paginadas'
   * #swagger.parameters['page'] = {
   *   in: 'query',
   *   required: false,
   *   schema: { type: 'number' }
   * }
   * #swagger.responses[200] = {
   *   description: 'Lista de especies'
   * }
  */
 controller.getSpeciePage
);

router.get(
  '/:id',
  /**
   * #swagger.tags = ['Species']
   * #swagger.summary = 'Obtener especie por ID'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.responses[200] = {
   *   description: 'Especie encontrada'
   * }
   * #swagger.responses[404] = {
   *   description: 'Especie no encontrada'
   * }
  */
 controller.getSpecieById
);

router.post(
  '/',
  /**
   * #swagger.tags = ['Species']
   * #swagger.summary = 'Crear una especie'
   * #swagger.parameters['body'] = {
   *   in: 'body',
   *   required: true,
   *   schema: { $ref: '#/definitions/Specie' }
   * }
   * #swagger.responses[201] = { description: 'Especie creada' }
   */
  controller.postSpecie
);

router.put(
  '/:id',
  /**
   * #swagger.tags = ['Species']
   * #swagger.summary = 'Editar especie (reemplazo completo)'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.requestBody = {
   *   required: true,
   *   content: {
   *     "application/json": {
   *       schema: { $ref: "#/components/schemas/Specie" }
   *     }
   *   }
   * }
   * #swagger.responses[200] = {
   *   description: 'Especie actualizada'
   * }
   */
  controller.editSpecie
);

router.delete(
  '/:id',
  /**
   * #swagger.tags = ['Species']
   * #swagger.summary = 'Eliminar especie'
   * #swagger.parameters['id'] = {
   *   in: 'path',
   *   required: true,
   *   schema: { type: 'string' }
   * }
   * #swagger.responses[200] = {
   *   description: 'Especie eliminada'
   * }
   */
  controller.deleteSpecie
);

module.exports = router;