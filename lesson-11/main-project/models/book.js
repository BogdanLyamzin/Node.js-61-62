const { Schema, model } = require("mongoose");
const Joi = require("joi");

const {handleMongooseError} = require("../utils");

const genreList = ["fantastic", "love"];
const emailRegexp = /^\d{2}-\d{2}-\d{4}$/;

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true, "title must be exist"],
    },
    author: {
        type: String,
        required: [true, "author must be exist"],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        enum: genreList,
        required: true,
    },
    // 10-10-2012
    date: {
        type: String,
        match: emailRegexp,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {versionKey: false, timestamps: true});

bookSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" is required`
    }),
    author: Joi.string().required().messages({
        "any.required": `"author" is required`,
        "string.empty": `"author" cannot be empty`,
        "string.base": `"author" must be string`
    }),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    date: Joi.string().pattern(emailRegexp).required(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Book = model("book", bookSchema);

module.exports = {
    Book,
    schemas,
}