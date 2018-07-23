'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const precipitation = new Schema({
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
        validate: /^\d+?$/,
        required:true
    },
    unity: {
        type:String,
        default: "mm",
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
},{collection: "type-precipitation"});

module.exports =  mongoose.model ('type-precipitation', precipitation);