const express = require('express');
const router = express.Router();
const {isAdmin,validateToken} = require('../middleware/validate.middleware');



const categoryController = require('../Controllers/category.controller')

router.post('/',isAdmin,validateToken,function(req, res){
    return categoryController.createCategory(req, res)
})

router.put('/:id',isAdmin,validateToken,function(req, res){
    return categoryController.editCategory(req, res)
})

router.get('/',isAdmin,validateToken,function(req, res){
    return categoryController.getCategoryWithPagination(req, res)
})

module.exports = router