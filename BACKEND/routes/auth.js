const express = require('express');
const router=express.Router();
const User=require('../MODELS/User');
const bcrypt=require('bcrypt');
const getToken = require('../utils/helper');

//Post router to register
router.post('/register',async(req,res)=>{
    //This code is run whrn the register api is called as a post request
    const{email,password,firstname,lastname, username} = req.body;

    //step 2: User already exists with this email?? if yes, throw an error
    const user=User.findOne({ email: email});
    if(user){
        return res
        .status(403)
        .json({error: 'User with this email already exists'});
    }
    //vaild request
    //step 3: Create a new user
    //we do not store password in plain text , convert to hash
    const hashedPassword=bcrypt.hash(password,10);
    const newuserdata={email,password:hashedPassword,firstname,lastname,username};
    constnewuser=await User.create(newuserdata);


    //Step 4: We want to create the token to return to the user
    const token =await getToken(email,newUser);
    
    //step 5: return the result to the user
    const userToreturn={...newUser.toJSON(),token};
    delete userToreturn.password;
    return res.status(200).json(userToreturn); 


});

router.post('/login',async(req, res) => {
    //step1 get email &password sent by user from req.body
    const {email,password} = req.body;
    //step2 chck if a user with email exists already
    const User=await User.findOne({email: email});
    if(!User){
        return res
       .status(403)
       .json({error: 'invalid Credentials'});
    }

    //ste3 if user exists, check credentials
    const isPasswordValid=await bcrypt.compare(password,User.password);
    if(!isPasswordValid){
        return res
       .status(403)
       .json({error: 'invalid Credentials'});
    }
    //step4 if credentials are valid, create a token and return it to user
    const token=await getToken(User.email,User);
    const userToreturn={...newUser.toJSON(),token};
    delete userToreturn.password;
    return res.status(200).json(userToreturn); 

    
});

module.exports=router;