"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
class ListChannels extends packet_1.SocketPacket {
    constructor() {
        super(...arguments);
        this.SendAck = 1;
    }
}
exports.ListChannels = ListChannels;
//# sourceMappingURL=list-channels.js.map