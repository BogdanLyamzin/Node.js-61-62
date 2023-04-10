const express = require("express");

const ctrl = require("../../controllers/books-controllers");

const {isValidId} = require("../../middlewares");

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/book");

const router = express.Router();

router.get("/", ctrl.getAllBooks);

router.get("/:id", isValidId, ctrl.getBookById);

router.post("/", validateBody(schemas.addSchema), ctrl.addBook);

router.put("/:id",isValidId,  validateBody(schemas.addSchema), ctrl.updateBookById);

router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById);

router.delete("/:id", isValidId, ctrl.deleteBookById);

module.exports = router;