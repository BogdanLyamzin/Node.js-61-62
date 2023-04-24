const express = require("express");

const ctrl = require("../../controllers/books-controllers");

const { isValidId, authenticate } = require("../../middlewares");

const { validateBody } = require("../../utils");

const { schemas } = require("../../models/book");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllBooks);

router.get("/:id", authenticate, isValidId, ctrl.getBookById);

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.addBook);

router.put("/:id", authenticate, isValidId, validateBody(schemas.addSchema), ctrl.updateBookById);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById);

router.delete("/:id", authenticate, isValidId, ctrl.deleteBookById);

module.exports = router;