const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    profilePic:{type:String, required:true},
    otp:{type:String },
    validtime:{type:Date},
},{
    timestamps:true
});


const User = mongoose.model("user", userSchema);

module.exports = User;

