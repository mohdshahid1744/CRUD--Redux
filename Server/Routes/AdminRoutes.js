
const express = require('express');
const router = express.Router();
const adminController = require('../Controller/adminController');
const { protect } = require('../Middleware/authMiddleware');

router.post('/',  adminController.adminLogin);
router.get('/getuser',protect,adminController.getUser);
router.get('/getuser/:id',protect, adminController.getSingleUser);
router.post('/searchuser',protect, adminController.searchUser);
router.post('/adduser',protect, adminController.addUser);
router.put('/updateuser/:id',protect, adminController.updateUser);
router.delete('/delete/:id',protect, adminController.deleteUser);

module.exports = router;
