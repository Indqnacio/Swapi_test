const router = require("express").Router();
const characterCtrl = require("../../controllers/character.controller");

router.get("/select", characterCtrl.getCharacterSelect);
router.get("/:id", characterCtrl.getCharacterById);
router.get("/", characterCtrl.getCharacterPage);

router.post("/", characterCtrl.postCharacter);
router.put("/:id", characterCtrl.editCharacter);
router.delete("/:id", characterCtrl.deleteCharacter);

module.exports = router;
