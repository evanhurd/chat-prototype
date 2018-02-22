"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
const enum_1 = require("./enum");
class SocketReadAck extends packet_1.SocketPacket {
    constructor() {
        super(...arguments);
        this.Type = enum_1.SocketPacketTypes.ReadAck;
    }
}
exports.SocketReadAck = SocketReadAck;
//# sourceMappingURL=read-ack.js.map