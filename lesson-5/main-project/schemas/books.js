const Joi = require("joi");

const addSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" is required`
    }),
    author: Joi.string().required().messages({
        "any.required": `"author" is required`,
        "string.empty": `"author" cannot be empty`,
        "string.base": `"author" must be string`
    }),
})

module.exports = {
    addSchema,
}