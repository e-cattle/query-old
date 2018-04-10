'use strict';

//ROUTERS apenas dos Device
const express = require('express');
const router = express.Router();
const deviceSyncController = require('../controllers/device-sync-controller');
const deviceKernelController = require('../controllers/device-kernel-controller');

const authService = require('../services/auth-service'); 

router.post('/', authService.authorizeKernelDevice, deviceSyncController.save);
router.get('/', deviceSyncController.getAll);

router.post('/authenticate', deviceKernelController.authenticate);
router.post('/renew-token', authService.renewToken);

module.exports = router;