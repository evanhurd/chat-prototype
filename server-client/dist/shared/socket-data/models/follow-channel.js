"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
class FollowChannel extends packet_1.SocketPacket {
    constructor() {
        super(...arguments);
        this.SendAck = 1;
    }
}
exports.FollowChannel = FollowChannel;
//# sourceMappingURL=follow-channel.js.map