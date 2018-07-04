const Hashids = require('hashids');
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const urls = [];

app.use(bodyParser.json());//Reading data in specific format. (In this case JSON data)
app.use(bodyParser.urlencoded({ extended: false }));// It can read all source of data types

app.listen(3800, function(){
    console.log('Listening on localhost:3800');
});

//Cargar Ruta
const url = require('./routes/url');


//Usar Ruta
app.use(url);