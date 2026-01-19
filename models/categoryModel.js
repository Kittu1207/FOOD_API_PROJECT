const mongoose = require('mongoose');


//schema 
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Category title is required'],

    },
    imageUrl:{
        type:String,
        default:"https://i.pinimg.com/236x/0e/3b/e4/0e3be4f99b7584ef2a853cb6c7f8a083.jpg"
    },


},
{timestamps:true});



//export
module.exports= mongoose.model('Category', categorySchema);