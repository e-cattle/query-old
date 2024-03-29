'use strict';
const mongoose = require('mongoose');
const Device = mongoose.model('Device');

exports.create = async(data) => {
    var device = new Device(data);
    return await device.save();
}

exports.update = async(data) => {
    return await Device.update(data);
}

exports.updateById = async(id, data) => {
    return await Device.findByIdAndUpdate(id, data);
}

exports.getAll = async() => {
    const res = await Device.find({}, "name description branch model mac enable version sensors");
    return res;
}

exports.getById = async(id) => {
    const res = await Device.findById(id);
    return res;
}

exports.getByMac = async(mac) => {
    const res = await Device.findOne({
        mac: mac
    });
    return res;
}

exports.getByMacEnabled = async(mac) => {
    const res = await Device.findOne({
        mac: mac,
        enable: true
    });
    return res;
}

exports.authenticate = async(data) => {
    const res = await Device.findOne({
        mac: data.mac,
        enable:true
    });
    return res;
}