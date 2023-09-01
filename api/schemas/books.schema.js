const Joi = require('joi');

const id = Joi.string()
const title = Joi.string()
const year = Joi.date();
const genre = Joi.string();

const createBookSchema = Joi.object({
    title: title.required(),
    year: year.required(),
    genre: genre.required(),
})


const updateBooktSchema = Joi.object({
    title:title,
    year:year,
    genre:genre,
})

const getBookSchema = Joi.object({
    id: id.required(),
});

const queryBookSchema = Joi.object({
    title,
    genre
})

module.exports={createBookSchema, updateBooktSchema,getBookSchema}