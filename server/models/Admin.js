const mongoose = require('mongoose');
const adminScheme = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
}
)
module.exports = mongoose.model("Admin", adminScheme)