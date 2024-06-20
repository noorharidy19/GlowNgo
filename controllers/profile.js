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

// Add new address
exports.addAddress = async (req, res) => {
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

        user.addresses.push(newAddress);
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Update an address by index
exports.updateAddress = async (req, res) => {
    const { street, city, state, buildingNo } = req.body;
    const addressIndex = req.params.index;

    try {
        let user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if address index is valid
        if (addressIndex < 0 || addressIndex >= user.addresses.length) {
            return res.status(400).json({ msg: 'Invalid address index' });
        }

        // Update address fields
        user.addresses[addressIndex].street = street;
        user.addresses[addressIndex].city = city;
        user.addresses[addressIndex].state = state;
        user.addresses[addressIndex].buildingNo = buildingNo;

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete an address by index
exports.deleteAddress = async (req, res) => {
    const addressIndex = req.params.index;

    try {
        let user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Check if address index is valid
        if (addressIndex < 0 || addressIndex >= user.addresses.length) {
            return res.status(400).json({ msg: 'Invalid address index' });
        }

        // Remove address at specified index
        user.addresses.splice(addressIndex, 1);
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Change user password
exports.changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

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

        user.phone = phone;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};