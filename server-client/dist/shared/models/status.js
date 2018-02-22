"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const packet_1 = require("./packet");
const enum_1 = require("./enum");
class Status extends packet_1.Packet {
    constructor() {
        super(...arguments);
        this.Type = enum_1.PacketTypes.Status;
    }
}
exports.Status = Status;
//# sourceMappingURL=status.js.map