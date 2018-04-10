'use strict';

const ValidationContract = require('../validators/fluent-validator');
const SensorTypeValidator = require('../validators/sensor-type-validator');
const deviceRepository = require('../repositories/device-repository');
const contractRepository = require('../repositories/contract-repository');
const authService = require('../services/auth-service');

async function validade(device){
    try{
        let sensorTypeValidator = new SensorTypeValidator();

        sensorTypeValidator.validadeMeasures(device.sensors);
        
        if (!sensorTypeValidator.isValid()) return sensorTypeValidator.errors();

        return;
        
    }catch(err){
        return err;
        throw err;
    }
}

/**
* Cadastra ou Altera o Device 
*/
exports.save = async(req, res, next) => {
    
    try {
        let device = req.body.device;
        let savedDevice =  await deviceRepository.getByMac(device.mac);

        if(device._id) delete device._id;

        // Validação
        let errors = await validade(device);
        if(errors){
            res.status(401).json({ message: errors })
            return;
        }
        
        device.syncedAt = new Date();        
        if (savedDevice){
            device._id = savedDevice._id
            await deviceRepository.update(device);
        }else await deviceRepository.create(device);
        
        //Envia o novo token para o dispositivo
        res.status(201).send({
            syncedAt: device.syncedAt
        });
        
        return;
        
    } catch (error) {
        res.status(500).send(error);
        throw error;
        return;
    }
};

exports.getAll =  async (req, res, next)=>{
    try{
        const devices = await deviceRepository.getAll();
        if (!devices){
            res.status(404).send({message:'Dipositivos não encontrados'});
            return;
        }
        res.status(200).send (devices);
    }catch(e){
        res.status(500).send({message:'Falha na requisição', data: e});
    }
};
