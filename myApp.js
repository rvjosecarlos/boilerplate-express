//const { MESSAGE_STYLE } = require('dotenv').config().parsed;
const bodyParser = require('body-parser');
let express = require('express');
let app = express();

console.log("Hello World");

app.use( bodyParser.urlencoded( { extended: true } ) );

app.get( '/now', (req, res, next)=>{
        req.time = new Date().toString();
        next();
}, (req, res)=>{
        res.json({"time": req.time});
});

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

        if( process.env['MESSAGE_STYLE'] === 'uppercase' ){
                res.json({"message": mensaje.toUpperCase()});
                return;
        }
        res.json({"message": mensaje});

});

app.get( '/parametro/:valor/parametro2/:valor2', (req, res, next)=>{
        res.json( req.params );
        next();
});

app.route( '/name' )
        .get( ( req, res, next )=>{
                const { first, last } = req.query;
                res.json( { name: `${first} ${last}` } );
                next();
        } )
        .post( (req, res, next)=>{
                res.json(req.body);
                next();
        } );

module.exports = app;