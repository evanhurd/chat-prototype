"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
class UnFollowChannel extends packet_1.SocketPacket {
    constructor() {
        super(...arguments);
        this.SendAck = 1;
    }
}
exports.UnFollowChannel = UnFollowChannel;
//# sourceMappingURL=unfollow-channel.js.map