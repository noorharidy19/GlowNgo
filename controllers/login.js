const User = require("../models/users"); // Assuming you have a User model defined
const bcrypt = require('bcryptjs');

// Login process function
const loginProcess = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            console.log("User does not exist.");
            return res.render("Home", {
                currentPage: "Home",
                user: req.session.user || "",
                error: "User does not exist."
              
            });
            
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.render("Home", {
                currentPage: "Home",
                user: req.session.user || "",
                error: "Invalid username or password."
            });
        }

        req.session.user = user;
        console.log("User logged in:", req.session.user);

        if (user.type === 'admin') {
            return res.render('admin', {
                currentPage: "admin",
                user: req.session.user
            });
        } else if (user.type === 'customer') {
            return res.render('myprofile', {
                currentPage: "myprofile",
                user: req.session.user
            });
        } else {
            return res.render("Home", {
                currentPage: "Home",
                user: req.session.user,
                error: "User type not recognized."
            });
        }
    } catch (error) {
        console.error("Error during login process:", error);
        res.status(500).send("Internal Server Error");
    }
};


const forgotPassword = async (req, res) => {
    try {
      
        const { username } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ success: false, msg: "User not found" });
        }
       
         res.redirect("/Home?showConfirmationPopup=true&email=" + user.email);
        
    } catch (error) {
        console.error("Error during forgot password process:", error);
        res.json({ success: false, msg: "An error occurred" });
    }
};


module.exports = {
    loginProcess,
    forgotPassword
};

