"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
const enum_1 = require("./enum");
class SocketStatus extends packet_1.SocketPacket {
    constructor() {
        super(...arguments);
        this.Type = enum_1.SocketPacketTypes.Status;
    }
}
exports.SocketStatus = SocketStatus;
//# sourceMappingURL=status.js.map