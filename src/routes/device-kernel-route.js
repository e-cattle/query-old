'use strict';

//ROUTERS para gerenciar os Rapsberrys PI
const express = require('express');
const router = express.Router();
const deviceKernelController = require('../controllers/device-kernel-controller');

const authService = require('../services/auth-service'); 

router.post('/', deviceKernelController.save);
router.put('/', deviceKernelController.save);
router.get('/', deviceKernelController.getAll);

router.post('/authenticate', deviceKernelController.authenticate);
router.post('/renew-token', authService.renewToken);

module.exports = router;