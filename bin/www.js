#!/usr/bin/env node
/**
 * Module dependencies.
 */
import app from '../app.js';

import http from 'http';
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val);
  // named pipe

  if (isNaN(port)) {
    return val;
  }
  // port number
  if (port >= 0) {
    return port;
  }
  return false;
};
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
  //  syscall (interface between an application and the Linux kernel)
  //  Throw error if the system call is not in listen state
  if (error.syscall !== 'listen') {
    console.log('✘ Application failed to start');
    console.error('✘', error.message);
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': // Acess Denied
      console.error('✘ Application failed to start');
      console.error(`✘ ${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE': // Port already in use
      console.error('✘ Application failed to start');
      console.error(`✘ Port/Pipe ${bind}  is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();

  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  console.log(`✔ Application Started on ${bind}`);
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
