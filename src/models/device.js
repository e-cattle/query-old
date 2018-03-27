'use strict';

const mongoose = require('mongoose');

//Representa um conjunto de devices que possem sensores e enviam dados 
//para o device kernel (raspberry)
const device = new mongoose.Schema({
    name: {
        type: String
    },
    enable:{
        type: Boolean,
        default:true
        
    },
    mac: {
        type: String,
        index: true,
     }, 
    version:{
        type: Number
    }, 
    dateSync:{
        type: Date,
        default:Date.now()
    },

    sensors: [{
        type:{
            type: String
        }, 
        descriptor:{
            type: String
        },
        unix:{
            type: String
        }
    }]
});

// device.path('sensors').validate(function(v) {
//     return v.length > 0;
//   });


module.exports = mongoose.model('Device', device);