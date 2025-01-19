const express = require("express");
const { default: mongoose } = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const app = express();
const authRoutes = require("./ROUTES/auth");
const User = require("./MODELS/User");
const songRoutes = require("./MODELS/Song")
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.json());

console.log(process.env);

// connecting mongodb to node app
// mongoose.connect() takes 2 argument 1.from which db to connect(db ke url se) 2. connection options


mongoose.connect(process.env.MONGO_URL)
    .then((x) => {
        console.log("Connected to MongoDB!");
    })
    .catch((err) => {
        console.error("Error while connecting to MongoDB:", err);
    });
// setup passprot jwt


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyisSupposedToBeSecret";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, User) {
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
app.use("/auth" , authRoutes);
app.use("/song" , songRoutes);


app.listen(port, () => {
    console.log(`App is running  on port ${port}`);
});
