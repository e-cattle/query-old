'use strict';

//ROUTERS apenas dos Device
const express = require('express');
const router = express.Router();
const controller = require('../controllers/device-sync-controller');
const authService = require('../services/auth-service');

router.post('/', controller.save);
router.put('/', controller.save);
router.get('/', controller.getAll);
router.post('/authenticate', controller.authenticate);
router.post('/renew-token', authService.renewToken);

module.exports = router;