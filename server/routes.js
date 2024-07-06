const express = require('express');
const router = express.Router();
const User = require('./model/userModel');
const bcrypt = require('bcrypt');
const middleware = require('./middleware');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secretKey ='akdaknafjeofhefijeofjnweofj9r840823348n2r2';
const {v4:uuidv4}= require("uuid");


router.post("/signup", async(req,res)=>{
    try{
        const {name , email , password, profilePic} = req.body;
        console.log(profilePic);
        const user = await User.findOne({email});
        if(user){
            res.json("User Already Exist");
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
                const token =  jwt.sign({_id : userSaved._id} , secretKey , {expiresIn:'1d'});
               // console.log(token);
                res.send([userSaved._id , token] );
            }
        }
    }
    catch(e){
        console.log(e);
    }
})



router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.json("User Not Found");
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '1d' });
            return res.send([user._id, token]);
        } else {
            return res.json("Invalid Password");
        }

        console.log("Worked");
    } catch (e) {
        console.log(e);
    }
});



router.get(`/sendotp/id`, async(req,res)=>{
    try{
        console.log("nmnmnm")
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.json("User Not Found");
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        var sender = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'no.reply.mailsenderbot0101@gmail.com',
                pass:'sfhm icdb zurv irpf'
            }
        });
        var composemail={
        from:'no.reply.mailsenderbot0101@gmail.com',
        to: sellermail ,
        subject:"OTP Verification",
        text:`the otp is ${otp}`
    }

    sender.sendMail(composemail, (error, info) => {
        if (error) {
            res.status(401).send("failed");
          console.log('Error occurred:', error.message);
          return;
        }
        console.log('Email sent:', info.response);
        res.status(200).send("success");
      });


    }
    catch(e){
        console.log(e);
    }
})


module.exports = router;