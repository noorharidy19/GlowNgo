const User = require('../models/users');
const bcrypt = require('bcryptjs');

// Change Password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    try {
        const user = await User.findOne({ username: req.params.username });

        // Validate old password using comparePassword method
        if (!user || !(await user.comparePassword(oldPassword))) {
            return res.status(401).json({ error: 'Incorrect old password' });
        }

        // Validate new passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Change Username
exports.changeUsername = (req, res) => {
    console.log('Received update request for ID:', req.params.id);
    console.log('Request body:', req.body);

    let updateObject = { username: req.body.username };
    

    console.log('Update object:', updateObject);

    User.findByIdAndUpdate(req.params.id, updateObject, { new: true, runValidators: true })
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).send('User not found');
            } else {
                console.log("Username updated successfully:", updatedUser);
                res.status(200).json({ message: 'Username updated successfully', user: updatedUser });
            }
        })
        .catch((err) => {
            console.error('Error updating username:', err);
            res.status(500).json({ error: 'Error updating username' });
        });
};

// Change Phone Number
exports.changePhone = async (req, res) => {
    const { newPhone } = req.body;

    try {
        // Retrieve user from database
        const user = await User.findOne({ username: req.params.username });

        // Update phone number
        user.phone = newPhone;
        await user.save();

        res.status(200).json({ message: 'Phone number updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Change Address
exports.changeAddress = async (req, res) => {
    const { street, city, state, buildingNo } = req.body;

    try {
        // Retrieve user from database
        const user = await User.findOne({ username: req.user.username });

        // Update address
        user.address = { street, city, state, buildingNo };
        await user.save();

        res.status(200).json({ message: 'Address updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// GET profile page
exports.getProfilePage = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.render('myprofile', { user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};