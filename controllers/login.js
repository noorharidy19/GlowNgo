const User = require("../models/users"); // Assuming you have a User model defined
const bcrypt = require('bcryptjs');

// Login process function
const loginProcess = async (req, res) => {
    try {
        // Retrieve username and password from req.body
        const { username, password } = req.body;

        // Search for the user in the database
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.send("wrong details");
        }

        // Check if the password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isPasswordMatch) {
            // Check user type and render the appropriate EJS template
            if (user.type === 'admin') {
                res.render('admin', { user });
                console.log("login successful");
                console.log("Welcome to the admin page, " + username);
            } else if (user.type === 'customer') {
                res.render('home', { user });
                console.log("login successful");
                console.log("Welcome to the home page, " + username);
            } else {
                res.send("User type not recognized");
            }
        } else {
            res.send("wrong password");
        }
    } catch (error) {
        console.error("Error during login process:", error);
        res.send("wrong details");
    }
};

const forgotPassword = async (req, res) => {
    try {
        // Retrieve username from req.body
        const { username } = req.body;

        // Search for the user in the database
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        // Return the user's email
        return res.json({ success: true, email: user.email });
        res.redirect("/Home?showConfirmationPopup=true");
    } catch (error) {
        console.error("Error during forgot password process:", error);
        res.json({ success: false, msg: "An error occurred" });
    }
};

module.exports = {
    loginProcess,
    forgotPassword
};

