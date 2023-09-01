const { Model, DataTypes, Sequelize} = require('sequelize')

const BOOK_TABLE = "books";

const BookSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.DATEONLY,
  },
  genre: {
    type: DataTypes.STRING,
  },
};

class Books extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: BOOK_TABLE,
      modelName: 'Books',
      timestamps: false
    };
  }
}



module.exports = { Books, BookSchema, BOOK_TABLE };