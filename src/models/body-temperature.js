'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bodyTemperature = new Schema({
    uid:{
        type:String,
        required:true,
        unique: true
    }, 
    kernelMac:{
        type:String,
        required:true
    },
    mac:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        min: 20,
        max: 50,
        validate: /^\d{0,2}(\.\d{1,2})?$/,
        required:true
    },
    unity: {
        type:String,
        default: "C",
        required:true
    },
    dateRegister:{
        type:Date,
        required:true
    },
    dataStorage:{
        type:Date,
        default: Date.now,
        required:true
    }, 
    dateSync:{
        type: Date,
        default:Date.now()
    },
},{collection: "type-body-temperature"});

module.exports =  mongoose.model ('type-body-temperature', bodyTemperature);