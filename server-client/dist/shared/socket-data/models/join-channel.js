"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
class JoinChannel extends packet_1.SocketPacket {
    constructor() {
        super(...arguments);
        this.SendAck = 1;
    }
}
exports.JoinChannel = JoinChannel;
//# sourceMappingURL=join-channel.js.map