const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors'); // Agregado
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Reemplaza el bloque de código CORS manual con el middleware cors
server.use(cors({
  origin: 'https://pi-videogames-main-mi-pi.vercel.app',
  credentials: true,
  methods: 'GET, POST, OPTIONS, PUT, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
}));

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;



//http://localhost:3000
      //https://pi-videogames-main-mi-pi.vercel.app/