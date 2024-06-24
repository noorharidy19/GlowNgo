const User = require('../models/users');
const bcrypt = require('bcryptjs');

// Change Password
exports.changePassword = async (req, res) => {
    console.log('Received password update request for user ID:', req.params.id);
    console.log('Request body:', req.body);

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Old and new passwords are required' });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }

        user.password = newPassword;
        await user.save();
        
        console.log('Password updated successfully for user ID:', req.params.id);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error updating password:', err);
        res.status(500).json({ error: 'Error updating password' });
    }
};

// Change Username
exports.changeUsername = (req, res) => {
    console.log('Request body:', req.body);

    // Validate the request body
    if (!req.body.username) {
        return res.status(400).send('New username is required');
    }

    let updateObject = { username: req.body.username };

    console.log('Update object:', updateObject);

    User.findOneAndUpdate({ _id: req.body.currentId }, updateObject, { new: true, runValidators: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).send('User not found');
        } else {
          console.log('Username updated successfully:', updatedUser);
          res.status(200).json({ message: 'Username updated successfully', user: updatedUser });
        }
      })
      .catch((err) => {
        console.error('Error updating username:', err);
        res.status(500).json({ error: 'Error updating username' });
      });
};

// Change Phone Number
exports.updatePhoneNumber = async (req, res) => {
    const userId = req.params.id; // Assuming the user ID is passed as a route parameter
    
    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Update the user's phone number
        user.phone = req.body.newPhone;
        
        // Save the updated user object
        await user.save();
        
        // Respond with a success message
        res.status(200).json({ message: 'Phone number updated successfully' });
        
    } catch (error) {
        console.error('Error updating phone number:', error);
        res.status(500).json({ error: 'Failed to update phone number' });
    }
};

// Change Address
xports.updateAddress = async (req, res) => {
    const userId = req.params.id; // Assuming user ID is passed as a route parameter

    try {
        // Find the user by their ID
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Update user's address fields
        user.address.street = req.body.street;
        user.address.city = req.body.city;
        user.address.state = req.body.state;
        user.address.buildingNo = req.body.buildingNo;

        // Save the updated user object
        await user.save();
        
        // Respond with a success message
        res.status(200).json({ message: 'Address updated successfully', user: user });
        
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ error: 'Failed to update address' });
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