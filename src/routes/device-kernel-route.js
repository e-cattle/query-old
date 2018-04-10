'use strict';

//ROUTERS para gerenciar os Rapsberrys PI
const express = require('express');
const router = express.Router();
const deviceKernelController = require('../controllers/device-kernel-controller');

const authService = require('../services/auth-service'); 

router.post('/', deviceKernelController.save);
router.options('/', (req, res) => res.send("OK"));
router.put('/', deviceKernelController.authenticate, deviceKernelController.save);
router.get('/', deviceKernelController.getAll);
router.get('/status/:mac', deviceKernelController.getStatusByMac);
router.get('/enable/:mac', deviceKernelController.enableByMac);
router.get('/disable/:mac', deviceKernelController.disableByMac);

router.post('/authenticate', deviceKernelController.authenticate);
router.post('/verify-token', authService.authorizeKernelDevice, (req, res) => res.send("OK"));
router.post('/renew-token', authService.renewToken);

module.exports = router;