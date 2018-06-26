'use strict';
const mongoose = require('mongoose');
const DryBulbTemperature = mongoose.model('DryBulbTemperature');

exports.create = async(data) => {
    var device = new SensorType(data);
   return await device.save();
}

exports.getAll = async() => {
    const res = await SensorType.find({});
    return res;
}

exports.getById = async(id) => {
    const res = await SensorType.findById(id);
    return res;
}
