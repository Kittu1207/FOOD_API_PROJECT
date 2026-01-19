//get user info

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");


const getUserController = async (req, res) => {
    try {
        const user=await userModel.findById({_id:req.headers.id});

        //validation
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User not found",

            });
        }

        //hide password
        // user. password = undefined;

        //response
        res.status(200).send({
            success: true,
            message: "User data fetched successfully",
            user,
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get user API",
            error,
        });
    }
};


//Update user
const updateUserController = async (req, res) => {
    try{
        //find user
        const user=await userModel.findById({_id:req.headers.id});
        //validation
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User not found",
            });
        }

        //update user
        const {userName,address,phone} = req.body;
        if(userName)
        {
            user.userName = userName;
        }
        if(address)
        {
            user.address = address;
        }
        if(phone)
        {
            user.phone = phone;
        }

        //save user
        await user.save();
        res.status(200).send({
            success:true,
            message:"User updated successfully",
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update user API",
            error,
        });
    }
};



//UPDATE PASSWORD CONTROLLER

const updatePasswordController= async (req,res) => {
    try {
        //Find User
        const user=await userModel.findById({_id:req.headers.id});

        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found",
            });
        }

        //get user data
        const {oldPassword,newPassword}= req.body;
        //validation
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:"Please provide old and new password",
            });
        }

        
        


        //check user password | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid old password",
            });
        }
        //hashing new password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        

        await user.save();

        res.status(200).send({
            success:true,
            message:"Password updated successfully",
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update password API",
            error,
        });
        
    }
};



//RESET PASSWORD CONTROLLER
const resetPasswordController = async (req,res) => {
    try {
        const {email,newPassword,answer}= req.body;

        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"Please provide all required fields",
            });

        }

        const user=await userModel.findOne({email,answer});
        if(!user){
            return res.status(500).send({
                success:false,
                message:"User not found or invalid answer",
                error,
            });
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;

        await user.save();

        res.status(200).send({
            success:true,
            message:"Password reset successfully",
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in reset password API",
            error,
        });
        
    }
};


//DELETE PROFILE CONTROLLER
const deleteProfileController = async (req,res) => {
    try {
        
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"User profile deleted successfully",
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete profile API",
            error,
        });
        
    }
};



module.exports = {
    getUserController,
    updateUserController,
    updatePasswordController,
    resetPasswordController ,
    deleteProfileController 
};
