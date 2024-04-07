const { Product } = require('../config/database');
const {Category } = require('../config/database')
const {User} = require('../config/database')
var jwt = require('jsonwebtoken');
const secretKey = 'nimpaTechnology123';
const redis = require('redis');
    

exports.createUser = async(req,res)=>{
    try{
        const {user_id,name,emaild,number,role} = req.body
        console.log("user body...",user_id,name,emaild,number,role);

        const userResult = await User.create({user_id,name,emaild,number,role})
        console.log("user result",userResult);
        res.json(userResult)

    }
    catch(err){
        console.log("Error creating user",err.stack);
        res.json({message:err.message});
    }
}

exports.loginUser = async(req,res)=>{
    try{
        const { emaild,role,number} = req.body;

        // Find the user in the database (replace with actual database query)
        const user = await User.findOne({ emaild});
        console.log("User found", user);

        if(user){
            const token = jwt.sign({ user_id: user.user_id, emaild: user.emaild , number : user.number}, secretKey, { expiresIn: '1h' });
            const redisClient = redis.createClient();
            redisClient.set(emaild, user.role);
            redisClient.quit();
            res.json({ token });
        }
        else{
            return res.status(401).json({ message: 'Invalid credentials' })
        }



    }
    catch(err){
        console.log("Error came from creating USER",err.stack);
        res.status(503).json("Internal Server Error")
    }
}
