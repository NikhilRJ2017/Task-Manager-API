const express = require('express');
const authenticateUser = require('../config/middlewares/authMiddleware');
const { getCurrentUser, updateUser, updatePassword } = require('../controllers/userController');
const router = express.Router();

router.route('/current_user').get(authenticateUser,getCurrentUser);
router.route('/update_user').patch(authenticateUser,updateUser);
router.route('/update_password').patch(authenticateUser,updatePassword);


module.exports = router;
