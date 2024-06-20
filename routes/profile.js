const express = require('express');
const router = express.Router();
const userController = require('../controllers/profile');

// Update username
router.put('/:email/username', userController.updateUsername);

// Add new address
router.post('/:email/address', userController.addAddress);

// Update an address by index
router.put('/:email/address/:index', userController.updateAddress);

// Delete an address by index
router.delete('/:email/address/:index', userController.deleteAddress);

// Change user password
router.put('/:email/password', userController.changePassword);

// Update phone
router.put('/:email/phone', userController.updatePhone);

module.exports = router;
