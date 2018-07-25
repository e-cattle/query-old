'use strict';

const mongoose = require('mongoose');

const SensorTypeValidator = require('../validators/sensor-type-validator');

const airTemperatureRepository = require('../repositories/air-temperature-repository');
const contractRepository = require('../repositories/contract-repository');
const authService = require('../services/auth-service');
const deviceService = require('../services/device-service');

exports.create = async (req, res, next) => {
};

exports.getAll = async (req, res, next)=>{
        try{                
                const devices = await airTemperatureRepository.getAll();                
                if (!devices){
                        res.status(404).send({message:'Valores não encontrados'});
                        return;
                }
                res.status(200).send (devices);
        }catch(e){
                res.status(500).send({message:'Falha na requisição', data: e});
        }
};
