const resturantModel = require("../models/resturantModel");

//CREATE RESTURANT || POST
const createResturantController=async (req,res)=>{
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
        //validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:"Title and Coords are required",
            });
        }
        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });


        await newResturant.save();

        res.status(201).send({
            success:true,
            message:"New Resturant created",
        });



    } 
    
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create resturant API",
            error,
        });
    }
};

//getAll resturants controller
const getAllResturantsController=async(req,res)=>{
    try {
        const resturants= await resturantModel.find({});
        if(!resturants){
            return res.status(404).send({
                success:false,
                message:"No resturants found",
            });
        }
        res.status(200).send({
            success:true,
            totalount:resturants.length,
            resturants,

        });



    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all resturants API",
            error,
        });
    }
};



//get resturant by id controller
const getResturantByIdController=async(req,res)=>{
    try {
        const resturantId=req.params.id;

        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"Resturant id is required",
            });
        }
        //find resturant
        const resturant= await resturantModel.findById(resturantId);
        if(!resturant){
            return res.status(404).send({
                success:false,
                message:"Resturant not found",
            });
        }
        res.status(200).send({
            success:true,
            resturant
        });



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get resturant by id API",
            error,
        });
    }
};




//delete resturant controller
const deleteResturantController=async(req,res)=>{
    try {
       
        const resturantId=req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"Resturant id is required",
            });
        }
        //delete resturant
        await resturantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success:true,
            message:"Resturant deleted successfully",
        });


    } 
    
    catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete resturant API",
            error,
        });
    }
};
module.exports={createResturantController,getAllResturantsController,getResturantByIdController,deleteResturantController};
