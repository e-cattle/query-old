'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soilNitrogen = new Schema({
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
        required:true
    },
    unity: {
        type:String,
        default: "%",
        required:true
    },
    dateRegister:{
        type:Date,
        default: Date.now,
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
},{collection: "type-soil-nitrogen"});

module.exports =  mongoose.model ('type-soil-nitrogen', soilNitrogen);