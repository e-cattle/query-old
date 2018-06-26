'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gdop = new Schema({
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
        hdop:{
            type:Number,
            required:false
        },
        vdop:{
            type:Number,
            required:false
        },
        pdop:{
            type:Number,
            required:false
        },
        tdop:{
            type:Number,
            required:false
        }
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
},{collection: "type-gdop"});

module.exports =  mongoose.model ('type-gdop', gdop);