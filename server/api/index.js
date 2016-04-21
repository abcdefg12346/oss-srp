const express = require("express");
const router = express.Router();

router.use("/session", require("./session"))
router.use("/srp", require("./srp"))

module.exports = router;