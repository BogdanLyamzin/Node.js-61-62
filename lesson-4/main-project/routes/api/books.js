const express = require("express");
const Joi = require("joi");

const books = require("../../models/books");

const {HttpError} = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" is required`
    }),
    author: Joi.string().required().messages({
        "any.required": `"author" is required`,
        "string.empty": `"author" cannot be empty`,
        "string.base": `"author" must be string`
    }),
    // Joi.string().pattern(//)
})

router.get("/", async(req, res, next)=> {
    try {
        const result = await books.getAll();
        res.json(result);
    }
    catch(error) {
        next(error);
    }
});

router.get("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await books.getById(id);
        if(!result) {
            throw HttpError(404, `Book with ${id} not found`);
            // const error = new Error(`Book with ${id} not found`);
            // error.status = 404;
            // throw error;
            // return res.status(404).json({
            //     message: `Book with ${id} not found`
            // })
        }
        res.json(result);
    }
    catch(error) {
        next(error);
    }
})

router.post("/", async(req, res, next)=> {
    try {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const result = await books.add(req.body);
        res.status(201).json(result);
    }
    catch(error) {
        next(error);
    }
})

router.put("/:id", async(req, res, next)=> {
    try {
        const {error} = addSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message);
        }
        const {id} = req.params;
        const result = await books.updateById(id, req.body);
        if(!result) {
            throw HttpError(404, `Book with ${id} not found`);
        }
        res.json(result);
    }
    catch(error) {
        next(error);
    }
})

router.delete("/:id", async(req, res, next)=> {
    try {
        const {id} = req.params;
        const result = await books.deleteById(id);
        if(!result) {
            throw HttpError(404, `Book with ${id} not found`);
        }
        // res.status(204).send()
        res.json({
            message: "Delete success"
        })
    }
    catch(error) {
        next(error);
    }
})

module.exports = router;