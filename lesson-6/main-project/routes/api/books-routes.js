const express = require("express");

const ctrl = require("../../controllers/books-controllers");

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/book");

const router = express.Router();

router.get("/", ctrl.getAllBooks);

router.get("/:id", ctrl.getBookById);

router.post("/", validateBody(schemas.addSchema), ctrl.addBook);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateBookById);

router.patch("/:id/favorite", validateBody(schemas.updateFavoriteSchema), ctrl.updateFavoriteById);

router.delete("/:id", ctrl.deleteBookById);

module.exports = router;