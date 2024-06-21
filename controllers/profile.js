const User = require('../models/profileSch');
const bcrypt = require('bcryptjs');

// Update username
exports.updateUsername = async (req, res) => {
    const { username } = req.body;

    try {
        let user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if new username already exists
        let usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        user.username = username;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add or update address
exports.updateAddress = async (req, res) => {
    const { street, city, state, buildingNo } = req.body;

    const newAddress = {
        street,
        city,
        state,
        buildingNo,
    };

    try {
        let user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.address = newAddress;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Change user password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ msg: 'New passwords do not match' });
    }

    try {
        let user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect old password' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update phone
exports.updatePhone = async (req, res) => {
    const { phone } = req.body;

    try {
        let user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.phoneNumber = phone;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
