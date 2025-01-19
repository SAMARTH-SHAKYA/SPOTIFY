const mongoose = require("mongoose");

// aage jake change hoga iss model  mai 

const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    songs:[
        {
            type: mongoose.Types.ObjectId.apply,
            ref:"Song",
        }
    ],
    collborators:[
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    ]
});

const PlaylistModel = mongoose.model("", Playlist)

module.exports = PlaylistModel;