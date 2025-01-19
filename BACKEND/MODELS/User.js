const mongoose = require("mongoose");

// aage jake change hoga iss model  mai 

const User = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    likedsongs:{
        //we will change this to array later
        type: String,
        default:"",
    },
    playlist:{
        //we will change this to array later
        type: String,
        default:"",
    },
    suscribedArtists:{
        type: String,
        default:"",
    }
});

const UserModel = mongoose.model("User",User)

module.exports = UserModel;