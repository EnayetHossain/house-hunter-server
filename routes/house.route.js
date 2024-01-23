const express = require("express");
const { addHouse, updateHouse } = require("../controllers/house.controller");

const router = express.Router();

router.route("/add-house").post(addHouse);
router.route("/update-house/:id").patch(updateHouse);

module.exports = router;
