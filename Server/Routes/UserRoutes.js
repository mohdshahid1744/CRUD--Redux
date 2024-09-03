

const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const { protect } = require('../Middleware/authMiddleware');
const {upload} = require('../Middleware/multer');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/updatepicture/:id',protect, upload.single('img'), userController.updatePicture);

module.exports = router;