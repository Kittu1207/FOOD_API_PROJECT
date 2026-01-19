const mongoose = require('mongoose');


//schema 
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'username is required'],
    },
    email:{
        type:String,
        required:[true,'Email required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'Password required'],
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'Phone number required'],
    },
    userType:{
        type:String,
        required:[true,'User type required'],
        default:'client',
        enum:['client','admin','vendor','driver'],
    },
    profile:{
        type:String,
        default:'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
    },
    answer:{
        type:String,
        required:[true,'Answer is required'],
    }

},{timestamps:true});



//export
module.exports= mongoose.model('User', userSchema);