const express = require('express');
const router = express.Router();
const User = require('../MODELS/User');
const bcrypt = require('bcrypt');
const getToken = require('../utils/helper');

// POST route to register
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstname, lastname, username } = req.body;

        // Step 2: Check if a user with the email already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(403).json({ error: 'User with this email already exists' });
        }

        // Step 3: Create a new user with a hashed password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            username
        });

        // Step 4: Create a token to return to the user
        const token = await getToken(email, newUser);

        // Step 5: Return the user data and token, excluding the password
        const userToReturn = { ...newUser.toJSON(), token };
        delete userToReturn.password;

        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST route to login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Step 2: Check if a user with the email exists
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(403).json({ error: 'Invalid credentials' });
        }

        // Step 3: If user exists, check credentials
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ error: 'Invalid credentials' });
        }

        // Step 4: If credentials are valid, create a token and return it
        const token = await getToken(user.email, user);
        const userToReturn = { ...user.toJSON(), token };
        delete userToReturn.password;

        return res.status(200).json(userToReturn);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
