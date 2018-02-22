"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_data_mapper_1 = require("./socket-data-mapper");
const models_1 = require("./models");
let idCounter = 0;
class SocketData {
    constructor(io) {
        this.io = io;
        this.message = new socket_data_mapper_1.SocketDataMapper(models_1.SocketMessage);
        this.statusChange = new socket_data_mapper_1.SocketDataMapper(models_1.SocketStatus);
        this.socketUserStatus = new socket_data_mapper_1.SocketDataMapper(models_1.SocketUserStatus);
        this.loginRequest = new socket_data_mapper_1.SocketDataMapper(models_1.LoginRequest);
        this.ack = new socket_data_mapper_1.SocketDataMapper(models_1.Ack);
        this.followChannel = new socket_data_mapper_1.SocketDataMapper(models_1.FollowChannel);
        this.joinChannel = new socket_data_mapper_1.SocketDataMapper(models_1.JoinChannel);
        this.leaveChannel = new socket_data_mapper_1.SocketDataMapper(models_1.LeaveChannel);
        this.listChannels = new socket_data_mapper_1.SocketDataMapper(models_1.ListChannels);
        this.unFollowChannel = new socket_data_mapper_1.SocketDataMapper(models_1.UnFollowChannel);
        this.userJoinedChannel = new socket_data_mapper_1.SocketDataMapper(models_1.UserJoinedChannel);
        this.userLeftChannel = new socket_data_mapper_1.SocketDataMapper(models_1.UserLeftChannel);
        this.createChannel = new socket_data_mapper_1.SocketDataMapper(models_1.CreateChannel);
        this.editMessage = new socket_data_mapper_1.SocketDataMapper(models_1.EditMessage);
        this.addSocket(io);
    }
    addSocket(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            this.message.addSocket(socket);
            this.statusChange.addSocket(socket);
            this.socketUserStatus.addSocket(socket);
            this.loginRequest.addSocket(socket);
            this.ack.addSocket(socket);
            this.followChannel.addSocket(socket);
            this.joinChannel.addSocket(socket);
            this.leaveChannel.addSocket(socket);
            this.listChannels.addSocket(socket);
            this.unFollowChannel.addSocket(socket);
            this.userJoinedChannel.addSocket(socket);
            this.userLeftChannel.addSocket(socket);
            this.createChannel.addSocket(socket);
            this.editMessage.addSocket(socket);
        });
    }
    emit(packet, emitFromSocket) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = packet.constructor.name;
            packet = Object.assign({}, packet);
            const channelId = packet.ChannelId || packet.userId;
            packet.PID = idCounter++;
            const cleanPacket = this.cleanPacket(packet);
            console.log('SEND', type, JSON.stringify(cleanPacket));
            if (!channelId) {
                throw new Error('Cannot emit packet due to undefined channel and user IDs! ' + JSON.stringify(cleanPacket));
            }
            if (emitFromSocket) {
                emitFromSocket.to(channelId).emit(type, cleanPacket);
            }
            else if (this.io.to) {
                this.io.to(channelId).emit(type, cleanPacket);
            }
            else {
                this.io.emit(type, cleanPacket);
            }
            if (packet.SendAck) {
                return yield this.waitForAck(packet.PID);
            }
            const ack = new models_1.Ack();
            ack.id = packet.PID;
            ack.status = true;
            return ack;
        });
    }
    waitForAck(PID) {
        return new Promise((res, rej) => {
            const t = setTimeout(() => {
                console.error('Timeout wating for ACK!', PID);
                sub();
            }, 2000);
            const sub = this.ack.sub(ack => {
                if (ack.id === PID) {
                    res(ack);
                    sub();
                    clearTimeout(t);
                }
            });
        });
    }
    cleanPacket(packet) {
        const clean = {};
        Object.assign(clean, packet);
        Object.keys(clean)
            .filter(key => key.startsWith('_'))
            .forEach(key => clean[key] = undefined);
        return clean;
    }
}
exports.SocketData = SocketData;
//# sourceMappingURL=socket-data.js.map