const mongoose = require("mongoose");

// aage jake change hoga iss model  mai 

const Song = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true,
    },
    track:{
        type: String,
        requried: true,
    },
    artist:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

const SongModel = mongoose.model("Song",Song)

module.exports = SongModel;