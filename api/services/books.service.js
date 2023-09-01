const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize.js')

class BooksService {
    constructor(){
        this.books=[]
    }

    async create(data){
        const newBook = await models.Books.create(data)
        return newBook;
    }

    async find(query){
        const options ={
            where: {}
        }

        const {genre} = query
        if(genre){
            options.where.genre = genre
        }
        const {title} = query
        if(title){
            options.where.title = title
        }

        const books = await models.Books.findAll(options)
        return books
    
    }

    async findOne(id){
        const book = await models.Books.findByPk(id)
        return book;
    }

    async update(id, changes) {
        const model = await this.findOne(id);
        const rta = await model.update(changes);
        return rta;
      }

      async delete(id) {
        const model = await this.findOne(id);
        await model.destroy();
        return { rta: true };
      }
}

module.exports = BooksService;