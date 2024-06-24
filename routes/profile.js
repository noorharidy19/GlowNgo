const express = require('express');
const router = express.Router();
const userController = require('../controllers/profile');

// Route to render profile page
router.get('/profile', userController.getProfilePage);

router.put('/:username/password', userController.changePassword);

router.post('/profile/changeUsername', userController.changeUsername);

router.put('/:username/phone', userController.changePhone);

router.put('/update', userController.changeAddress);


module.exports = router;
    