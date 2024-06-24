const bcrypt = require('bcryptjs');
const User = require("../models/users.js");

const signupProcess = async (req, res) => {
    try {
        const { username, email, password, confirmPassword, address, phoneNumber } = req.body;
        console.log("Form data received:", req.body); // Debug: Print form data

        // Check for missing fields
        if (!username || !email || !password || !confirmPassword || !address || !phoneNumber) {
            console.log("Error: Missing fields");
            return res.render("Home", {
                // errorMessage: "Please fill all the fields.",
                // errorMessageClass: 'error', // Ensure errorMessageClass is defined
                user: req.session.user || "",
                showConfirmationPopup: false,
                email,
                // showPopupSignin: 'popupContainerSignUp'
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            console.log("Error: Passwords do not match");
            return res.render("Home", {
                // errorMessage: "Passwords do not match.",
                // errorMessageClass: 'error', // Ensure errorMessageClass is defined
                user: req.session.user || "",
                showConfirmationPopup: false,
                email,
                // showPopupSignin: 'popupContainerSignUp'
            });
        }

        // Check if user or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            console.log("Error: User or email already exists");
            return res.render("Home", {
                // errorMessage: "User or email already exists.",
                errorMessageClass: 'error', // Ensure errorMessageClass is defined
                user: req.session.user || "",
                showConfirmationPopup: false,
                email,
                // showPopupSignin: 'popupContainerSignUp'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // Save new user to database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            address,
            phoneNumber
        });
        await newUser.save();
        console.log("New user saved to database:", newUser);

        req.session.user = newUser;
        // Render success message or redirect as needed
        res.render("Home", {
            successMessage: "Account created successfully!",
            user: req.session.user || "",
            showConfirmationPopup: false,
            email,
            showPopupSignin: ''
        });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { signupProcess };
