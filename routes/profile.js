const express = require('express');
const router = express.Router();
const userController = require('../controllers/profile');

// Route to render profile page
router.get('/profile', userController.getProfilePage);

router.put('/profile/:id', userController.changePassword);

router.put('/profile/changeUsername', userController.changeUsername);

router.put('/profile/:id', profileController.updatePhoneNumber);

router.put('/profile/:id', profileController.updateAddress);


module.exports = router;
    