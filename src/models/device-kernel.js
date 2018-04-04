'use strict';

const mongoose = require('mongoose');

// representa o Device  Respberry - API - Kernel 
const device = new mongoose.Schema({
    enable:{
        type: Boolean, 
        default:true
    },
    mac: {
        type: String,
        index: true
    }
});

module.exports = mongoose.model('DeviceKernel', device);