const categoryModel = require("../models/categoryModel");

//CREATE CATEGORY || POST
const createCatController=async (req,res)=>{
    try {
        
        const { title, imageUrl }= req.body;
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:"Title and ImageUrl are required",
            });
        }

        const newCategory = new categoryModel({title,imageUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"Category created successfully",
            newCategory
        });


    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create category API",
            error,
        });
    }
};


//GETALL CATEGORIES || GET
const getAllCatController=async (req,res)=>{
    try {
        
        const categories=await categoryModel.find({});
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"No categories found",
            });
        }

        res.status(200).send({
            success:true,
            message:"Categories fetched successfully",
            totalCat:categories.length,
            categories
        });




    }
     catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all categories API",
            error
        });
    }
};


//UPDATE CATEGORY || PUT

const updateCatController=async (req,res)=>{
    try {
        
        const { id }= req.params;
        const { title, imageUrl }= req.body;
        const updatedCategory=await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true});

        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:"Category not found",
            });
        }

        res.status(200).send({
            success:true,
            message:"Category updated successfully",
            updatedCategory,
        });
        





    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update category API",
            error
        });
    }
};


//delete category controller

const deleteCatController=async (req,res)=>{
    try {
        
        const { id }= req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:"Valid category id is required"
            });
        }

        const deletedCategory=await categoryModel.findByIdAndDelete(id);

        if(!deletedCategory){
            return res.status(404).send({
                success:false,
                message:"Category not found"
            });
        }

        res.status(200).send({
            success:true,
            message:"Category deleted successfully",
            deletedCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete category API",
            error
        });
    }
};



module.exports={createCatController,getAllCatController,updateCatController,deleteCatController};