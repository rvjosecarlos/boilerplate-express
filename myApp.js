const { MESSAGE_STYLE } = require('dotenv').config().parsed;
let express = require('express');
let app = express();

console.log("Hello World");

app.use( (req, res, next)=>{
        const { method, path, ip } = req;
        const respuesta = `${method} ${path} - ${ip}`;
        console.log(respuesta);
        next();
});

app.get( '/', ( req, res )=>{

        res.sendFile(`${__dirname}/views/index.html`);
    
});

app.use( "/public", express.static( __dirname + '/public' ) );

app.get( '/json', (req, res)=>{

        const mensaje = "Hello json";

        if( MESSAGE_STYLE === 'uppercase' ){
                res.json({"message": mensaje.toUpperCase()});
                return;
        }
        res.json({"message": mensaje});

});

module.exports = app;