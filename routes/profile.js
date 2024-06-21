const express = require('express');
const router = express.Router();
const userController = require('../controllers/profile');
const User = require('../models/users');

// Update username
router.put('/:email/username', userController.updateUsername);

// Add or update address
router.put('/:email/address', userController.updateAddress);

// Change user password
router.put('/:email/password', userController.changePassword);

// Update phone
router.put('/:email/phone', userController.updatePhone);

// Route to get profile information by username
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.render('myprofile', { user }); // Pass user object to the template
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
