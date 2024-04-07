const express = require('express');
const router = express.Router();

const productController = require('../Controllers/product.controller')

router.post('/',function(req, res){
    return productController.createProduct(req, res)
})

router.get('/:id',function(req, res){
    return productController.getProductById(req, res)
})

router.get('/',function(req, res){
    return productController.getProductWithPagination(req, res)
})

router.get('/products/filter', function(req, res){
    return productController.getProductByCategoryAndPrice(req, res)
})

module.exports = router

// http://localhost: 3003/products?page=1&limit=10
// http://localhost: 3003/products/products/filter?category_id=111&minPrice=0&maxPrice=40