'use strict';
const mongoose = require('mongoose');
const DeviceKernel = mongoose.model('DeviceKernel');

exports.create = async(data) => {
    var device = new DeviceKernel(data);
    return await device.save();
}

exports.update = async(data) => {
    return await DeviceKernel.update({_id: data._id}, data);
}

exports.getAll = async() => {
    const res = await DeviceKernel.find({});
    return res;
}

exports.getById = async(id) => {
    const res = await DeviceKernel.findById(id);
    return res;
}

exports.getByMac = async(mac) => {
    const res = await DeviceKernel.findOne({
        mac: mac
    });
    return res;
}

exports.getByMacEnabled = async(mac) => {
    const res = await DeviceKernel.findOne({
        mac: mac,
        enable: true
    });
    return res;
}