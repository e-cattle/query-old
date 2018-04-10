'use strict';

const mongoose = require('mongoose');

// representa o Device  Respberry - API - Kernel 
const device = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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