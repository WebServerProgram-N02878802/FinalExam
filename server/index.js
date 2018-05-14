const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();

var Model = require('./model');

const servername = "localhost";
const port = 8080;

app
    .use(bodyParser.urlencoded({ extended: false }))
    .use(bodyParser.json())
    .use('/', (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();      
    })
    .use('/', express.static(path.join(__dirname, "../dist/")))

    //do search filter on server -> response is array of filtered words
    .get('/search', (req, res) => res.send(this.Model.states.filter(v => v.toLowerCase().indexOf(req.query.Text.toLowerCase()) > -1).slice(0, 10)))

    .use('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, "../dist/index.html"));
    })
    .listen(port);

console.log("running on http://" + servername + ":" + port)