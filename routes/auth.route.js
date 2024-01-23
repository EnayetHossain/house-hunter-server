const express = require("express");
const { signIn, signUp } = require("../controllers/auth.controller");

const router = express.Router();

router.route("/sign-in").post(signIn);
router.route("/sign-up").post(signUp);

module.exports = router;
