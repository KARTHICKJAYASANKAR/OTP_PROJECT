const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const middleware = require('./middleware');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secretKey ='akdaknafjeofhefijeofjnweofj9r840823348n2r2';
const {v4:uuidv4}= require("uuid");


router.post("/signup", async(req,res)=>{
    try{
        const {name , email , password, profilePic} = req.body;
        const user = await User.findOne({email});
        if(user){
            res.send("User Already Exist");
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                name,
                email,
                password:hashedPassword,
                profilePic
            });

            const userSaved = await newUser.save();
            if(userSaved){
                
                res.send("User Created Successfully");
            }
        }
    }
    catch(e){
        console.log(e);
    }
})