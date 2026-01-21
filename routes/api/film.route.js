const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("esta funcionando");
});

module.exports = router;
