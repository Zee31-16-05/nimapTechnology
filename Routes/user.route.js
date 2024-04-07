const express = require('express');
const router = express.Router();

const userController = require('../Controllers/user.controller')


router.post('/',function(req, res){
    return userController.createUser(req, res)
})

router.get('/',function(req, res){
    return userController.loginUser(req, res)
})

module.exports = router