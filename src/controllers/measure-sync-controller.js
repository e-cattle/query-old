'use strict';

const mongoose = require('mongoose');

const SensorTypeValidator = require('../validators/sensor-type-validator');

const deviceRepository = require('../repositories/device-repository');
const deviceKernelRepository = require('../repositories/device-kernel-repository');
const contractRepository = require('../repositories/contract-repository');
const authService = require('../services/auth-service');
const deviceService = require('../services/device-service');

/**
1) Identica o Raspberry se ele está castrado
2) Registra todas os dados sensoriais de todos os devices 
*/
exports.create = async (req, res, next) => {
        
        try {
                // Le o mac do dispositivo (Raspberry) e valida se existe
                const deviceKernel = await deviceKernelRepository.getByMacEnabled(req.body.kernelMac)
                
                //Envia mensagem de erro se não encontrar dispositivo
                if (!deviceKernel) {
                        res.status(404).send({message: 'Dispositivo kernel inválido ou bloqueado'});
                        return;
                }
                
                let sensors = req.body.sensors;
                let kernelMac = deviceKernel.mac;
                
                if (!sensors) {
                        res.status(404).send({message: 'É necessário informar os sensores'});
                        return;
                }

                let sensorsError = [];
                let sensorsValid = [];
                let sensorsNoValid = [];

                //Salva os dados sensoriais
                for (let i = 0; i < sensors.length; i++) {
                        let sensor = sensors[i];
                        let sensorsContract = device.sensors;
                        let hasSensor = false;
                        
                        //verifica se existe o sensor no contrato
                        for (let j = 0; j < sensorsContract.length; j++)
                        {                                
                                if (sensorsContract[j].name == sensor.name)
                                {                                        
                                        hasSensor = true;

                                        var guid = require('crypto').randomBytes(30).toString('base64');
                                        sensor.datas = {uid: guid, value: sensor.value, date: sensor.date, resource: sensor.resource};

                                        let Schema = mongoose.model(sensorsContract[j].type)
                                        let newMeasure = new Schema(sensor.datas);
                                        let savedMeasure = await newMeasure.save();

                                        if(savedMeasure)
                                                sensorsValid.push(sensorsContract[j].type);
                                        else
                                                sensorsError.push(savedMeasure);
                                }                                        
                        }
                
                        if (!hasSensor)
                                sensorsNoValid.push(sensor.name);
                }

                if (sensorsNoValid.length == 0 && sensorsError == 0)
                        res.status(201).send({message: `Todos os dados sensoriais foram salvos com sucesso`});
                else
                        res.status(500).send({sucess: sensorsValid, notfound: sensorsNoValid, erros: sensorsError});
                
                /*
                let hasError = false;
                let sensorsError = [];

                //Salva os dados sensoriais
                for (let i = 0; i < sensors.length; i++) {
                        let sensor = sensors[i];
                        //Solicita o schema pelo nome dinâmicamente
                        let Schema = mongoose.model(sensor.name);
                        for (let i = 0; i < sensor.measures.length; i++) {
                                let measure = sensor.measures[i];
                                measure.kernelMac = kernelMac;
                                let newMesure = new Schema(measure);
                                let savedMeasure = await newMesure.save();
                                //if(!savedMeasure) res.status(500).send({message: `Falha ao salvar dado sensorial: ${sensor.name}`, data: e});

                                if(!savedMeasure)
                                {
                                        hasError = true;
                                        sensorsError.push(savedMeasure);
                                }
                        }
                }
                
                if (!hasError)
                        res.status(201).send({message: `Dados sensoriais salvos com sucesso`});
                else
                        res.status(500).send({message: `Falha ao salvar dado sensorial:`, data: sensorsError});
                */
                
        } catch (error) {
                res.status(500).json({ message: error });
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
