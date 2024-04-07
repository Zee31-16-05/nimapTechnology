const express = require('express');
const app = express();
// const Product = require('./Models/product.model')
const db = require('./config/database')
const productRoute = require('./Routes/product.model')
const categoryRoute = require('./Routes/category.route')
const userRoute = require('./Routes/user.route')
const PORT = 3003
app.use(express.json())

app.use('/products/',productRoute)
app.use('/category/',categoryRoute)
app.use('/user/',userRoute)

// db.authenticate()
//     .then(()=> console.log("Database connected successfully"))
//     .catch((err)=> console.error("error came while connecting to Database",err))
//     db.sync({force : false});

app.listen(PORT,()=>{
        console.log(`listening on PORT : ${PORT}`)
    });