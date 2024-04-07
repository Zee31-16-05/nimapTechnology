const { Sequelize, DataTypes } = require('sequelize');
const db = require("../config/database")
const Product = require('./product.model')

const Category = db.define(
    'Category',
    {

        category_Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING
        },


    },
    {
        tableName: 'category',
    }

)

Category.hasMany(Product, { foreignKey: 'category_Id' });

// db.sync({force : true});
module.exports = Category;