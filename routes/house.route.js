const express = require("express");
const {
  addHouse,
  updateHouse,
  deleteHouse
} = require("../controllers/house.controller");

const router = express.Router();

router.route("/").post(addHouse);
router.route("/:id").patch(updateHouse).delete(deleteHouse);

module.exports = router;
