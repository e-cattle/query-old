'use strict';

const mongoose = require('mongoose');

const SensorTypeValidator = require('../validators/sensor-type-validator');

const deviceRepository = require('../repositories/device-repository');
const contractRepository = require('../repositories/contract-repository');
const authService = require('../services/auth-service');
const deviceService = require('../services/device-service');

/**
 1) Identica o Raspberry se ele está castrado
 2) Registra todas os dados sensoriais de todos os devices 
 */
exports.create = async (req, res, next) => {
        
       
        //Le o mac do dispositivo (Raspberry) e valida se existe
        const deviceKernel = await deviceRepository.authenticate({mac: req.body.mac});
        
        //Envia mensagem de erro se não encontrar dispositivo
        if (!deviceKernel) {
                res.status(404).send({message: 'Dispositivo Inválido ou Bloqueado'});
                return;
        }
        
        //Measures de todos os sensores de todos os devices existentes
        let measures = req.body.measures;
        
        //Verifica se tem medidas
        if (!measures) {
                res.status(404).send({message: 'É necessário informar os dados sensoriais'});
                return;
        }
        
      
        //Salva os dados sensoriais
        for (let i = 0; i < measures.length; i++) {
                let sensor = measures[i];
                //Solicita o schema pelo nome dinâmicamente
                let Schema = mongoose.model(sensor.type);
                let newMesure = new Schema(sensor.datas);
                console.log(newMesure);
                let savedMeasure = await newMesure.save();
                if(!savedMeasure) res.status(500).send({message: `Falha ao salvar dado sensorial: ${sensor.name}`, data: e});
                else res.status(201).send({message: `Dado sensorial salvo com sucesso`, data: savedMeasure});
        }
};

exports.getAll = async (req, res, next)=>{
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