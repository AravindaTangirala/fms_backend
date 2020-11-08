const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const usersys = require("../controllers/user");
router.post("/signup", usersys.post_signup);

router.post("/login", usersys.post_login);

router.delete("/:userId", usersys.delete_user);

module.exports = router;
