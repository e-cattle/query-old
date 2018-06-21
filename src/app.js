'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const router = express.Router();

// Connecta ao banco
mongoose.connect(config.db.development, {useMongoClient: true});
mongoose.Promise = global.Promise;

// Carrega os Models
const Devicekernel = require('./models/device-kernel'); //raspberry
const Device = require('./models/device'); //devices do raspberry
const Constract = require('./models/contract');
const AirTemperature = require('./models/air-temperature');
const AnimalSpeed = require('./models/animal-speed');
const AnimalWeight = require('./models/animal-weight');
const BlackGlobeTemperature = require('./models/black-globe-temperature');
const BodyTemperature = require('./models/body-temperature');

// Carrega as Rotas
const indexRoute = require('./routes/index-sync-route'); //Rotas da pagina inicial
const deviceKernelRoute= require('./routes/device-kernel-route'); //Cadastro de Dispositivos
const deviceSyncRoute = require('./routes/device-sync-route'); //Cadastro de Dispositivos
const measureSyncRoute = require('./routes/measure-sync-route'); //Cadastro de dados dos Sensores

//Conversor de Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Registrando as rotas
app.use('/', indexRoute);
app.use('/devices-kernel', deviceKernelRoute);
app.use('/devices-sync', deviceSyncRoute);
app.use('/measures-sync', measureSyncRoute);

module.exports = app;