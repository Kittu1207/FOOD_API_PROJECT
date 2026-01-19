const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//CREATE FOOD ITEM || POST
const createFoodController=async (req,res)=>{
    try {
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restraunt,
            rating 
        } = req.body;
        //validation
        if(!title || !description || !price || !restraunt){
            return res.status(500).send({
                success:false,
                message:"Title, Description, Price and Restraunt are required",
            });
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restraunt,
            rating
        });

        await newFood.save();
        res.status(201).send({
            success:true,
            message:"New Food Item Created",
            newFood
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in create food API",
            error
        });
    }
};


//GET ALL FOOD ITEMS || GET
const getAllFoodController=async (req,res)=>{
    try {
        
        const foods=await foodModel.find({});
        if(!foods){
            return res.status(404).send({
                success:false,
                message:"No food items found",
            });
        }

        res.status(200).send({
            success:true,
            message:"Food items fetched successfully",
            totalFoods:foods.length,
            foods
        });




    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all food API",
            error
        });
    }
};


//GET FOOD BY ID || GET
const getFoodByIdController=async (req,res)=>{
    try {
        
        const foodId=req.params.id;
        if(!foodId){
            return res.status(400).send({
                success:false,
                message:"Food id is required",
            });
        }

        const food=await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"Food item not found",
            });
        }

        res.status(200).send({
            success:true,
            message:"Food item fetched successfully",
            food
        });




    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get food by id API",
            error
        });
    }
};

//GET FOOD BY RESTURANT ID || GET
const getFoodByResturantIdController=async (req,res)=>{
    try {
        
        const resturantId=req.params.id;
        if(!resturantId){
            return res.status(400).send({
                success:false,
                message:"Resturant id is required",
            });
        }

        const foods=await foodModel.find({restraunt:resturantId});
        if(!foods){
            return res.status(404).send({
                success:false,
                message:"No food items found for this resturant",

            });
        }

        res.status(200).send({
            success:true,
            message:"Food items fetched successfully",
            totalFoods:foods.length,
            foods
        });





    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get food by resturant id API",
            error
        });
    }
};




//UPDATE FOOD || PUT
const updateFoodController=async (req,res)=>{
    try {
        
        const foodId=req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"No food id was found",
            });
        }

        const food=await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"Food item not found",
            });
        }

        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restraunt,
            rating 
        }=req.body;


        const updatedFood=await foodModel.findByIdAndUpdate(foodId,
            {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restraunt,
            rating }
            ,{new:true});

        res.status(200).send({
            success:true,
            message:"Food item updated successfully",
            updatedFood
        });





    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update food API",
            error
        });
    }
};


//DELETE FOOD || DELETE
const deleteFoodController=async (req,res)=>{
    try {
        
        const foodId=req.params.id;
        if(!foodId){
            return res.status(404).send({
               success:false,
               message:"Food id not found or invalid food id", 
            });
        }

        const food=await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"Food item not found",
            });
        }

        await foodModel.findByIdAndDelete(foodId);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete food API",
            error
        });
    }
};


//PLACEORDER FOOD || POST
const placeOrderController=async (req,res)=>{
    try {
        
        const {cart}=req.body;
        if(!cart)
        {
            return res.status(500).send({
                success:false,
                message:"Plese add to cart",
            });
        }

        let total=0;

        //CALCULATION
        cart.map((i)=>{
            total+=i.price;
        });

        const newOrder= new orderModel({
            foods:cart,
            payment:total,
            buyer:req.headers.id
        });


        await newOrder.save();

        res.status(201).send({
            success:true,
            message:"Order placed succesfully",
            newOrder
        });






    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in order food API",
            error
        });
    }
};



//ORDER STATUS CONTROLLER

const orderStatus=async (req,res)=>{
    try {
        
        const orderId=req.params.id;

        if(!orderId){
            return res.status(404).send({
                stauts:false,
                message:"Order not found or invalid id"
            });
        }

        
        const {status}=req.body;
        const order=await orderModel.findById(orderId,{status},{new:true});
        res.status(200).send({
            success:true,
            message:"Status updated"
        });






    } catch (error) {
        console.log(erroir);
        res.status(500).send({
            success:false,
            message:"Error in order status API",
            error
        });
    }
};



module.exports={
    createFoodController,
    getAllFoodController,
    getFoodByIdController,
    getFoodByResturantIdController,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatus
};