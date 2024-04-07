const { Product } = require('../config/database');
const {Category } = require('../config/database')
const { isAdmin } = require('../middleware/validate.middleware')


exports.createCategory = async(req,res)=>{
    try{
        const {category_id,name,createdBy} = req.body
        console.log("my body...",category_id,name,createdBy);

        if(createdBy === "admin"){
        const CategoryResult = await Category.create({category_id,name,createdBy})
        console.log("productResult.......",CategoryResult)
        res.status(200).json(CategoryResult)
    }
    else{
        res.status(401).json("You are not allowed to create a new category")
    }
    }
    catch(err){
        console.log("Error creating category",err.stack);
        res.json({error : "internal server error"})
    }
}

exports.editCategory = async(req, res, next) => {
    try{
        const categoryDetails = req.body;
        const id = req.params.id
        console.log("my category ID",id);
        const {name,createdBy} = req.body

        if(role === 'admin'){

            const isCategoryIdExist = await Category.findOne({where: { category_id: id }})
            if(isCategoryIdExist){
                const updatedCategory = await Category.update({categoryDetails}, { where: { category_id: id } })
                console.log("updated category",updatedCategory);
        
                res.status(201).json("category updated successfully")
            }
            else{
                res.status(404).json("Category ID does not exist")
            }
           
        }
        else{
            res.status(402).json("you are not allowed to edit this category")
        }

     
    }
    catch(err){
        console.log("Error editing category",err.stack);
        res.json({error : "internal server error"})
    }
}

exports.getCategoryWithPagination = async(req, res, next) => {
    try{
        
        const page = parseInt(req.query.page) || 1; // Default page is 1
        const limit = parseInt(req.query.limit) || 10; // Default limit is 10
        const offset = (page - 1) * limit;

        console.log("query....",page,limit,offset);

        const getCategoryResult = await Category.findAll({ offset, limit })
        console.log("getCategory Result :",getCategoryResult)
        res.json(getCategoryResult)     

    }
    catch(err){
        console.log("error came while getting all categorry",err.stack);
        res.status(500).json({error :err.message});
    }
}