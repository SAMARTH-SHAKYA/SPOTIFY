const express = require("express");
const router = express.Router();
const User = require("../MODELS/User");
const bcrypt = require("bcrypt");


router.post("/register", async (req, res) => {

    const { email, password, firstname, lastname, username } = req.body;

    const User = await User.firstOne({ email: email });
    if (User) {
        return res
            .status(403)
            .json({ erroe: "A user with this email already exists" });
    }

    const hashedPassword = bcrypt.hash(password,10);
    const newUserData = { email, password:hashedPassword, firstname, lastname, username };
    const newUser = await User.create(newUserData);

    const token = getToken(email, newUser);
});