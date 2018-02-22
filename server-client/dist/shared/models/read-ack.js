"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
const enum_1 = require("./enum");
class ReadAck extends packet_1.Packet {
    constructor() {
        super(...arguments);
        this.Type = enum_1.PacketTypes.ReadAck;
    }
}
exports.ReadAck = ReadAck;
//# sourceMappingURL=read-ack.js.map