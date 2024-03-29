'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const router = express.Router();

// Connecta ao banco

if(process.env.NODE_ENV == 'production'){
    mongoose.connect( config.db.production, {useMongoClient: true});
} else if(process.env.NODE_ENV == 'docker'){
    mongoose.connect( config.db.docker, {useMongoClient: true});
} else{
    mongoose.connect( config.db.development, {useMongoClient: true});
}

mongoose.Promise = global.Promise;

// Carrega os Models
const Devicekernel = require('./models/device-kernel'); //raspberry
const Device = require('./models/device'); //devices do raspberry
const Constract = require('./models/contract');
const Accelerometer = require('./models/accelerometer');
const AirTemperature = require('./models/air-temperature');
const AnimalSpeed = require('./models/animal-speed');
const AnimalWeight = require('./models/animal-weight');
const BlackGlobeTemperature = require('./models/black-globe-temperature');
const BodyTemperature = require('./models/body-temperature');
const CH4 = require('./models/ch4');
const CO2 = require('./models/co2');
const DewPointTemperature = require('./models/dew-point-temperature');
const DryBulbTemperature = require('./models/dry-bulb-temperature');
const GateOpened = require('./models/gate-opened');
const GDOP = require('./models/gdop');
const GeographicCoordinate = require('./models/geographic-coordinate');
const Gyroscope = require('./models/gyroscope');
const HeartRate = require('./models/heart-rate');
const Magnetometer = require('./models/magnetometer');
const PH = require('./models/ph');
const Precipitation = require('./models/precipitation');
const RelativeHumidity = require('./models/relative-humidity');
const RespiratoryFrequency = require('./models/respiratory-frequency');
const RetalTemperature = require('./models/retal-temperature');
const SoilMoisture = require('./models/soil-moisture');
const SoilNitrogen = require('./models/soil-nitrogen');
const SoilTemperature = require('./models/soil-temperature');
const SoilWaterPotencial = require('./models/soil-water-potencial');
const SolarRadiation = require('./models/solar-radiation');
const WaterTemperature = require('./models/water-temperature');
const WetBulbTemperature = require('./models/wet-bulb-temperature');
const WindSpeed = require('./models/wind-speed');

// Carrega as Rotas
const indexRoute = require('./routes/index-sync-route'); //Rotas da pagina inicial
const deviceKernelRoute= require('./routes/device-kernel-route'); //Cadastro de Dispositivos
const deviceSyncRoute = require('./routes/device-sync-route'); //Cadastro de Dispositivos
const measureSyncRoute = require('./routes/measure-sync-route'); //Cadastro de dados dos Sensores

const airTemperatureSyncRoute = require('./routes/air-temperature-sync-route'); //Cadastro de dados dos Sensores

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

app.use('/air-temperature-sync', airTemperatureSyncRoute);

module.exports = app;