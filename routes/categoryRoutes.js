const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require('../controllers/categoryController');

const router = express.Router();


//routes
//CREATE CATEGORY || POST
router.post('/create',authMiddleware,createCatController);

//GET ALL CATEGORIES || GET
router.get('/getAll',getAllCatController);


//UPDATE CATEGORY || PUT
router.put('/update/:id',authMiddleware,updateCatController);

//DELETE CATEGORY || DELETE
router.delete('/delete/:id',authMiddleware,deleteCatController);


module.exports = router;