"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PacketTypes;
(function (PacketTypes) {
    PacketTypes[PacketTypes["Message"] = 0] = "Message";
    PacketTypes[PacketTypes["ReadAck"] = 1] = "ReadAck";
    PacketTypes[PacketTypes["Status"] = 2] = "Status";
})(PacketTypes = exports.PacketTypes || (exports.PacketTypes = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["Typing"] = 0] = "Typing";
    UserStatus[UserStatus["Active"] = 1] = "Active";
    UserStatus[UserStatus["Inactive"] = 2] = "Inactive";
    UserStatus[UserStatus["Offline"] = 3] = "Offline";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
//# sourceMappingURL=enum.js.map