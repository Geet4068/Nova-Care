const express = require('express');
const AdminController = require('../controller/AdminController');
const router = express.Router();

router.get('/verification/:token', AdminController.verification);

module.exports = router;