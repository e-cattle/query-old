'use strict';

const ValidationContract = require('../validators/fluent-validator');
const SensorTypeValidator = require('../validators/sensor-type-validator');
const deviceKernelRepository = require('../repositories/device-kernel-repository');
const contractRepository = require('../repositories/contract-repository');
const authService = require('../services/auth-service');

/**
* Cadastra ou Altera o Device da API-Kernel (Sistema Manager)(Raspberry PI)
*/
exports.save = async(req, res, next) => {
    
    try {
        
        console.log("Iniciando save...")
        //Localiza o Disposito caso já exista
        let deviceKernel =  await deviceKernelRepository.getByMac(req.body.mac);
        console.log("Buscando devide save..."+ deviceKernel)
        //senao existe cria um novo
        if (!deviceKernel){
            deviceKernel = {};
            deviceKernel.enable = false;
            deviceKernel.mac = req.body.mac;
        }
        
        //Atualizando com os dados HTTP
        deviceKernel.mac= req.body.mac;
       
        //Cadastra o Dispositivo
        let deviceCreated = await deviceKernelRepository.create(deviceKernel);
        
        //Geração do Token
        //Gera o token valido para o dispositivo
        const token = await authService.generateToken({
            id: deviceCreated._id,
            mac: deviceCreated.mac
        });
        
        //Envia o novo token para o dispositivo
        res.status(201).json({
            token: token
        });
        
        return ;
        
    } catch (error) {
        res.status(500).json(error);
        throw error;
    }
};

exports.enableByMac =  async (req, res, next)=>{
    if(!req.params || !req.params.mac) res.status(400).json({ message: "MAC deve ser informado!" })
    else{
        let deviceKernel =  await deviceKernelRepository.getByMac(req.params.mac);
        if(!deviceKernel){ res.status(404).json({ message: "Device não encontrado!" }); return; }
        deviceKernel.enable = true;
        deviceKernelRepository.update(deviceKernel);
        res.json({ message: "Device abilitado com sucesso!" });
    }
}

exports.disableByMac =  async (req, res, next)=>{
    if(!req.params || !req.params.mac) res.status(400).json({ message: "MAC deve ser informado!" })
    else{
        let deviceKernel =  await deviceKernelRepository.getByMac(req.params.mac);
        if(!deviceKernel){ res.status(404).json({ message: "Device não encontrado!" }); return; }
        deviceKernel.enable = false;
        deviceKernelRepository.update(deviceKernel);
        res.json({ message: "Device desabilitado com sucesso!" });
    }
}

exports.getAll =  async (req, res, next)=>{
    try{
        const devices = await deviceKernelRepository.getAll();
        if (!devices){
            res.status(404).send({message:'Dipositivos não encontrados'});
            return;
        }
        res.status(200).send (devices);
    }catch(e){
        res.status(500).send({message:'Falha na requisição', data: e});
    }
};

exports.getStatusByMac =  async (req, res, next)=>{
    try{
        const device = await deviceKernelRepository.getByMac(req.params.mac);
        if (!device){
            res.status(404).json({ message:'Dipositivo não encontrado' });
            return;
        }
        res.status(200).json(device);
    }catch(e){
        res.status(500).json({message:'Falha na requisição', data: e});
    }
};

/**
* Autentica o Dispositivo pelo Mac Adress 
*/
exports.authenticate = async(req, res, next) => {
    try {
        //Le o mac do dispositivo e valida se existe
        const device = await deviceKernelRepository.authenticate({
            mac: req.body.mac
        });
        //Envia mensagem de erro se não encontrar dispositivo
        if (!device) {
            res.status(404).send({
                message: 'Dispositivo Inválido ou Bloqueado'
            });
            return;
        }
        //Gera o token valido para o dispositivo
        const token = await authService.generateToken({
            id: device._id,
            name: device.name, 
            mac:req.body.mac
        });
        
        //Envia o token para o dispositivo
        res.status(201).send({
            token: token,
            data: {
                id: device._id
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Falha ao processar sua requisição', 
            data:e
        });
    }
};
