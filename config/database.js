const { Sequelize, DataTypes }  = require('sequelize');


const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres', 
  port :'5432',
  username : 'postgres',
  password : 'root@123',
  database : 'nimapTechnology',
  logging: false, 
});
// Define Product model
const Product = sequelize.define('Product', {
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category : {
    type : DataTypes.STRING
  }
});

// Define Category model
const Category = sequelize.define('Category', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy : {
    type : DataTypes.STRING
  }
});

//define user model
const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emaild : {
    type : DataTypes.STRING,
    unique : true
  },
  number : {
    type : DataTypes.BIGINT,
    unique : true
  },
  role : {
    type : DataTypes.STRING,
  }
});



// Define one-to-many relationship
Category.hasMany(Product, { foreignKey: 'category_id' }); // Each category can have multiple products
Product.belongsTo(Category, { foreignKey: 'category_id' }); // Each product belongs to one category

// Synchronize the models with the database
(async () => {
  try {
    await sequelize.sync();
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();

// Export models
module.exports = { Product, Category,User };

// module.exports = sequelize;