let express = require('express');
let app = express();

console.log("Hello World");

app.get( '/', ( req, res )=>{
    console.log('SOLICITUD',req);
    console.log('RESPUESTA',res);
    res.send('Hello Express');
});

module.exports = app;