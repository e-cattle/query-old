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
            deviceKernel.enabled=req.body.enabled;
            deviceKernel.mac= req.body.mac;
        }
        
        //Atualizando com os dados HTTP
        deviceKernel.mac= req.body.mac;
        deviceKernel.name = req.body.name;
       
        //Cadastra o Dispositivo
        let deviceCreated = await deviceKernelRepository.create(device);
        
        //Geração do Token
        //Gera o token valido para o dispositivo
        const token = await authService.generateToken({
            id: deviceCreated._id,
            name: deviceCreated.name
        });
        
      
        //Envia o novo token para o dispositivo
        res.status(201).send({
            token: token
        });
        
        return ;
        
    } catch (error) {
        res.status(500).send(error);
        return;
    }
};

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
                id: device._id,
                name: device.name 
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
