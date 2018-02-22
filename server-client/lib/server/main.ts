import * as SocketIO from 'socket.io';
import { SocketServer } from './socket-server';

const io = SocketIO(80);
const server = new SocketServer(io);
