const express = require('express');
const router = express.Router();
const User = require('./model/userModel');
const bcrypt = require('bcrypt');
const middleware = require('./middleware');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const secretKey ='akdaknafjeofhefijeofjnweofj9r840823348n2r2';


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
            return res.status(404).json("Invalid Password");
        }

        console.log("Worked");
    } catch (e) {
        console.log(e);
    }
});


router.get(`/sendotp/:id`, async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.json("User Not Found");
        }
        const otp = Math.floor(1000 + Math.random() * 9000);
        user.otp = otp;
        user.validtime = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();
        
        var sender = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'no.reply.mailsenderbot0101@gmail.com',
                pass:'sfhm icdb zurv irpf'
            }
        });
        var composemail = {
            from: 'no.reply.mailsenderbot0101@gmail.com',
            to: user.email,
            subject: "OTP Verification",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333;">OTP Verification</h2>
                    <p style="color: #555;">Dear ${user.name},</p>
                    <p style="color: #555;">Thank you for using our service. Your OTP for verification is:</p>
                    <p style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</p>
                    <p style="color: #555;">Please enter this OTP to complete your verification process. The OTP is valid for 10 minutes.</p>
                    <p style="color: #555;">If you did not request this OTP, please ignore this email or contact our support team.</p>
                    <p style="color: #555;">Best regards,<br>Karthick</p>
                </div>
            `
        };
        

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



router.post('/validateotp', async (req, res) => {
    try {
        const { otp, id, timeLeft } = req.body;
        //console.log(timeLeft);
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // console.log("user.validtime:", user.validtime, "Type:", typeof user.validtime);
        // console.log("Date.now():", Date.now(), "Type:", typeof Date.now());

        if (user.otp == otp && timeLeft>0) {
            return res.status(200).json("success");
        } else {
            console.log("failed")
            return res.status(400).json({ error: "Invalid OTP or OTP expired" });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
});


router.get(`/getuser/:id` , middleware, async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({error:"User not found"});
        }
        return res.status(200).json(user);
    }
    catch(e){
        console.log(e);
    }
})



module.exports = router;
 
