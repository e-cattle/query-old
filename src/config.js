global.SALT_KEY = 'k90o08h6-90909-esd45-5454-0090909099898ej';
global.EMAIL_TMPL = 'Olá, <strong>{0}</strong>, seja bem vindo à plataforma (API Application) -  IOT E-Cattle Cloud!';

module.exports = {
    
    /*
    db: {
        production: "mongodb://mestradovirmerson:mestradovirmerson@ds123129.mlab.com:23129/mestrado-virmerson",
        development: "mongodb://mestradovirmerson:mestradovirmerson@ds123129.mlab.com:23129/mestrado-virmerson",
        test: "mongodb://<dbuser>:<dbpassword>@ds123129.mlab.com:23129/mestrado-virmerson",
    }
    */
    
    db: {
        production: "mongodb://localhost:27017/e-cattle",
        docker: "mongodb://localhost:27017/e-cattle",
        development: "mongodb://localhost:27017/e-cattle",
        test: "mongodb://localhost:27017/e-cattle",
    }
}