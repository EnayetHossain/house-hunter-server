const express = require("express");
const { addHouse } = require("../controllers/house.controller");

const router = express.Router();

router.route("/add-house").post(addHouse);

module.exports = router;
