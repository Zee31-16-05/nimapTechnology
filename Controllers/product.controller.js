const { Product,Category } = require('../config/database');
const { Op } = require('sequelize');


exports.createProduct = async(req, res, next) => {
    try{
        const {product_id,name,price,description,category} = req.body
        console.log("my body...",product_id,name,price,description,category);

        const productResult = await Product.create({product_id,name,price,description,category})
        console.log("productResult.......",productResult)
        res.status(200).json(productResult)
    }
    catch(err){
        console.log("error came while creating product",err.stack);
        res.json({error : "internal server error"})
    }
}

exports.getProductById = async(req, res, next) => {
    try{
        const id = req.params.id
        console.log("getProduct Id :",id);

        const getProductResult = await Product.findOne({product_id : id})
        console.log("getProduct Result :",getProductResult)
        res.json(getProductResult)     

    }
    catch(err){
        console.log("error came while getting product",err.stack);
        res.status(500).json({error :err.message});
    }
}

exports.getProductWithPagination = async(req,res)=>{
    try{

        const page = parseInt(req.query.page) || 1; // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10
        const offset = (page - 1) * limit;

        console.log("query....",page,limit,offset);

        const getProductResult = await Product.findAll({ offset, limit })
        console.log("getProduct Result:",getProductResult)
        res.json(getProductResult)   

    }
    catch(err){
        console.log("Failed to get product with pagination",err.stack);
        res.status(500).json({error :err.message});
    }
}

exports.getProductByCategoryAndPrice = async(req,res,next)=>{
    try{
        const { category_id, minPrice, maxPrice } = req.query;
        console.log("query params", category_id, minPrice, maxPrice);

         // Construct the filter object based on provided query parameters
         const filter = {};
         if (category_id) {
             filter.category_id = category_id;
         }
         if (minPrice && maxPrice) {
             filter.price = {
                 [Op.between]: [minPrice, maxPrice]
             };
         } else if (minPrice) {
             filter.price = {
                 [Op.gte]: minPrice
             };
         } else if (maxPrice) {
             filter.price = {
                 [Op.lte]: maxPrice
             };
         }

          // Fetch products based on the filter
        const products = await Product.findAll({
            where: filter,
            include: [Category],
            // order: [['createdAt', 'DESC']]
        });

        res.json(products);
    }
    catch(err){
        console.log("Error getting product by category and price",err.stack)
        res.status(500).json({error :err.message});
    }
}