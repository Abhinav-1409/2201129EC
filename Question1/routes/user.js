const express = require("express");
const { getTopUsers } = require("../controllers/user");
const router = express.Router();

router.get("/", getTopUsers);

module.exports = router;