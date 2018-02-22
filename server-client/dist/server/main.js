"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketIO = require("socket.io");
const socket_server_1 = require("./socket-server");
const io = SocketIO(80);
const server = new socket_server_1.SocketServer(io);
//# sourceMappingURL=main.js.map