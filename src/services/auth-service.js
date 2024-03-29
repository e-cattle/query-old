'use strict';
const jwt = require('jsonwebtoken');
const DeviceRepository = require('../repositories/device-repository');
const deviceKernelRepository = require('../repositories/device-kernel-repository');

/*
Gera o token baseado nos dados "data", junto coma a chave privada global.SALT_KEY
*/
var generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.generateToken = generateToken;

/**
*  Retorna os dados decodificados inseridos no token  
*/
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

/*
valida se o token é valido
*/
exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

/*
valida se o token é valido e se Raspberry tem permissão de sincronizar
*/
exports.authorizeDevice = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                //Verifica se Dispositivo tem permissão.
                
                next();
            }
        });
    }
};

exports.authorizeKernelDevice = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var kernelMac = req.body.kernelMac || req.query.kernelMac;
    
    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, async function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                if(!kernelMac) res.status(401).json({ message: 'Endereço MAC do kernel não fornecido' });
                else if(decoded.mac != kernelMac){
                    res.status(401).json({ message: 'Endereço MAC do kernel não corresponde ao token fornecido' });
                }else{
                    let deviceKernel = await deviceKernelRepository.getByMacEnabled(kernelMac);
                    if(!deviceKernel){
                        res.status(401).json({ message: 'Dispositivo com o endereço MAC fornecido não está registrado' });
                    }else next();
                }
            }
        });
    }
};

/*
Renova o token do Raspberry é de um device cadastrado e ativo, quando o token
estiver expirado
*/
exports.renewToken = async function (req, res) {
    var mac = req.body.mac;

    if(!mac){
        res.status(401).json({
            message: 'O MAC do dispositivo deve ser informado'
        });
        return;
    }

    var device = await DeviceRepository.getByMacEnabled(mac);

    if(!device){
        res.status(401).json({
            message: 'Dispositivo não encontrado ou não habilitado'
        });
        return;
    }

    var token = await generateToken({
        id: device._id,
        mac: device.mac
    });

    res.json({token: token});
};