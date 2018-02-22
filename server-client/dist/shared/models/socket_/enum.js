"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SocketPacketTypes;
(function (SocketPacketTypes) {
    SocketPacketTypes[SocketPacketTypes["Message"] = 0] = "Message";
    SocketPacketTypes[SocketPacketTypes["ReadAck"] = 1] = "ReadAck";
    SocketPacketTypes[SocketPacketTypes["Status"] = 2] = "Status";
})(SocketPacketTypes = exports.SocketPacketTypes || (exports.SocketPacketTypes = {}));
var SocketUserStatus;
(function (SocketUserStatus) {
    SocketUserStatus[SocketUserStatus["Typing"] = 0] = "Typing";
    SocketUserStatus[SocketUserStatus["Active"] = 1] = "Active";
    SocketUserStatus[SocketUserStatus["Inactive"] = 2] = "Inactive";
    SocketUserStatus[SocketUserStatus["Offline"] = 3] = "Offline";
})(SocketUserStatus = exports.SocketUserStatus || (exports.SocketUserStatus = {}));
//# sourceMappingURL=enum.js.map