const express = require("express");
const {
  addHouse,
  updateHouse,
  deleteHouse,
  getAllHouses
} = require("../controllers/house.controller");

const router = express.Router();

router.route("/").get(getAllHouses).post(addHouse);
router.route("/:id").patch(updateHouse).delete(deleteHouse);

module.exports = router;
