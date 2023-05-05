const { ctrlWrapper } = require("../utils");

const {Book} = require("../models/book");

const { HttpError } = require("../helpers");

const getAllBooks = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await Book.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
    res.json(result);
}

const getBookById = async (req, res) => {
    const { id } = req.params;
    // const result = await Book.findOne({_id: id});
    const result = await Book.findById(id);
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }
    res.json(result);
};

const addBook = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Book.create({...req.body, owner});
    res.status(201).json(result);
}

const updateBookById = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }
    res.json(result);
}

const updateFavoriteById = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }
    res.json(result);
}

const deleteBookById = async (req, res) => {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
        throw HttpError(404, `Book with ${id} not found`);
    }

    res.json({
        message: "Delete success"
    })
}

module.exports = {
    getAllBooks: ctrlWrapper(getAllBooks),
    getBookById: ctrlWrapper(getBookById),
    addBook: ctrlWrapper(addBook),
    updateBookById: ctrlWrapper(updateBookById),
    updateFavoriteById: ctrlWrapper(updateFavoriteById),
    deleteBookById: ctrlWrapper(deleteBookById),
}