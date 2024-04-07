const {Sequelize,DataTypes} = require('sequelize');
const db = require("../config/database")
const Category = require('./category.model')

const Product = db.define(
    'Product',
    {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        name : {
            type : DataTypes.STRING,
            // unique : true,
        },
        price : {
            type : DataTypes.INTEGER
        },
        description : {
            type : DataTypes.STRING
        },
        image : {
           type : DataTypes.STRING 
        },
        category : {
            type : DataTypes.STRING,
        }
    },
    {
        tableName : 'product',
    }
);
Product.belongsTo(Category, { foreignKey: 'category_Id'});


// db.sync({force : true});
module.exports = Product;