/* globals console */
"use strict"
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
app.set('view engine', 'pug');
//Store all HTML files in view folder.
app.use(express.static(path.join(__dirname+'/views')));
//Store all JS and CSS in Scripts folder.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

global.exp = express;
const connections = require('./config/connections.js');
global.exp.connections = connections;

const mongoConnection = connections.mongoose;
const mongoConnectionString = 'mongodb://' + mongoConnection.username + ':' + mongoConnection.password + '@' + mongoConnection.url + ':' + mongoConnection.port + '/' + mongoConnection.db;
console.log(mongoConnectionString);
const mongoose = require('mongoose');
mongoose.connect(mongoConnectionString);
global.exp.mongoose = mongoose;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

require('./api/models/Birds.js');

const birds = require('./api/controller/birdsController.js');

app.use('/birds', birds);

// app.get('/', (req, res) => {
//   res.render('index', {
//     title: 'Users☺',
//     message: 'This is basic user CRUD!☺'
//   });
// });
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/index.html'));
})

const server = app.listen(3000, () => {
  let port = server.address().port;
  console.log('Example app listening on port %s!', port);
});
