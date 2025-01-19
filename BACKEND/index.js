const express = require("express");
const { default: mongoose } = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./MODELS/User")
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
    .then((x) => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.error("Error while connecting to MongoDB:", err);
    });



let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, User) {
        if (err) {
            return done(err, false);
        }
        if (User) {
            return done(null, User);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));



app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`App is running  on port ${port}`);
});
