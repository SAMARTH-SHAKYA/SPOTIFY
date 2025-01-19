const express = require('express');
const router=express.Router();
const passport = require("passport");
const Song = require("../MODELS/Song")


router.post("/create" , passport.authenticate("jwt" , {session:false}),async (res , req) => {
    // req.user gets the user because of passport.authenticate
    const {name , thumbnail, track} = req.body;
    if (!name || !thumbnail || !track) {
        return res.status(301).json({ err: "Insufficient data to create song." });
    }
    const artist = req.user._id;
    const songDetails =  {name , thumbnail, track , artist};
    const createdSong = await Song.create(songDetails);     
    return res.status(200).json(createdSong);
}); 

// get all songs that i have publish
router.get("/get/mysongs"  , passport.authenticate("jwt", {session:false}),async (res , req)=>{
    const currentUser = req.user;
    // need to get all songs where artist id == currentUser._id
    const songs = await Song.find({artist: req.user._id});
    return res.status(200).json({data :songs});
     
});

module.exports = router;