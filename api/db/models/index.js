const { Books, BookSchema } = require( "./book.model")

function setupModels(sequelize){
    Books.init(BookSchema, Books.config(sequelize))

   
}

module.exports = setupModels;

