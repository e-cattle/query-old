'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soilWaterPotencial = new Schema({
    uid:{
        type:String,
        required:true,
        unique: true
    }, 
    mac:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        min: 0,
        max: 100,
        validate: /^\d{0,3}?$/,
        required:true
    },
    unity: {
        type:String,
        default: "Cbar",
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
    syncedAt:{
        type: Date        
    },
},{collection: "type-soil-water-potencial"});

module.exports =  mongoose.model ('type-soil-water-potencial', soilWaterPotencial);