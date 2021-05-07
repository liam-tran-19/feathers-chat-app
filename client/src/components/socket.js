import feathers from "feathers-client";
import io from "socket.io-client";
// import socketio from '@feathersjs/socketio-client';

const host = "http://localhost:3001";
const socket = io(host);
export const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks());
