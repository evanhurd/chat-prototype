"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
class LoginRequest extends packet_1.SocketPacket {
    constructor() {
        super(...arguments);
        this.SendAck = 1;
    }
}
exports.LoginRequest = LoginRequest;
//# sourceMappingURL=login-request.js.map