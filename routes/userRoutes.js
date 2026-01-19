const express = require('express');
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//routes
//GET user data || GET
router.get("/getUser", authMiddleware, getUserController);

//Update Profile || PUT
router.put("/updateUser",authMiddleware, updateUserController);

//Password update
router.post("/updatePassword", authMiddleware, updatePasswordController);

//Update password 
router.post("/resetPassword",authMiddleware,resetPasswordController);

//DELETE user || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController); 


module.exports = router;