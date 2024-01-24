const express = require("express");
const {
  addHouse,
  updateHouse,
  deleteHouse,
  getAllHouses
} = require("../controllers/house.controller");
const verifyJWT = require("../middlewares/verifyJWT.middleware");

const router = express.Router();

router.route("/").get(getAllHouses).post(verifyJWT, addHouse);
router
  .route("/:id")
  .patch(verifyJWT, updateHouse)
  .delete(verifyJWT, deleteHouse);

module.exports = router;
