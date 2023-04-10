const express = require("express");

const ctrl = require("../../controllers/auth-controllers")

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;