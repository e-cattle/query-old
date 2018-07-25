'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/air-temperature-sync-controller');
const authService = require('../services/auth-service');

//router.post('/', authService.authorizeKernelDevice, controller.create);
router.get('/', controller.getAll);

module.exports = router;