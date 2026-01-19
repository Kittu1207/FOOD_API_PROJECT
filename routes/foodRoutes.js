const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createFoodController, 
    getAllFoodController, 
    getFoodByIdController, 
    getFoodByResturantIdController, 
    updateFoodController, 
    deleteFoodController,  
    placeOrderController,
    orderStatus
} = require('../controllers/foodControllers');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();


//routes
//CREATE FOOD ITEM || POST
router.post('/create',authMiddleware,createFoodController);

//GET ALL FOOD ITEMS || GET
router.get('/getAll',getAllFoodController);

//GET FOOD BY ID || GET
router.get('/get/:id',getFoodByIdController);

//GET FOOD BY RESTURANT ID || GET
router.get('/resturant/:id',getFoodByResturantIdController);

//UPDATE FOOD || PUT
router.put('/update/:id',authMiddleware,updateFoodController);

//DELETE FOOD || DELETE
router.delete('/delete/:id',authMiddleware,deleteFoodController);

//ORDER FOOD || POST
router.post('/placeOrder',authMiddleware,placeOrderController);

//ORDER STATUS || POST
router.post('/orderStatus/:id', authMiddleware ,adminMiddleware,orderStatus);

module.exports = router;