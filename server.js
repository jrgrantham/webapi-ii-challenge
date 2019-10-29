const express = require('express');
const router = require('./data/db-router');
const server = express();

server.use(express.json()); // using a piece of middleware

server.use('/api/posts', router);

server.get('/', (req, res) => {
  res.send(`
    HELLO THERE
  `);
});

// new endpoint right here
server.post('/greet/:firstname/:lastname', (req, res) => {
  const { salute } = req.query;
  const { firstname, lastname } = req.params;
  const { message } = req.body;
  // the server gets the METHOD, the HEADERS...
  // and anything else that comes in the HTTP request
  res.status(200).json({
    greet: `${salute}, ${firstname} ${lastname}! ${message}`
  });
});

module.exports = server;