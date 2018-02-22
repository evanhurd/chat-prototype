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
const socket_data_1 = require("../shared/socket-data");
const Models = require("../shared/socket-data/models");
const db_1 = require("./db");
class SocketServer {
    constructor(io) {
        this.db = new db_1.DB();
        this.data = new socket_data_1.SocketData(io);
        this.io = io;
        this.io.on('connection', socket => this.onConnection(socket));
        this.data.message.sub(data => this.handleCall('message', this.onMessage(data)));
        this.data.loginRequest.sub(data => this.handleCall('loginRequest', this.onLoginRequest(data)));
        this.data.followChannel.sub(data => this.handleCall('followChannel', this.onFollowChannel(data)));
        this.data.listChannels.sub(data => this.handleCall('listChannels', this.onListChannels(data)));
        this.data.joinChannel.sub(data => this.handleCall('joinChannel', this.onJoinChannel(data)));
        this.data.leaveChannel.sub(data => this.handleCall('leaveChannel', this.onLeaveChannel(data)));
        this.data.createChannel.sub(data => this.handleCall('createChannel', this.onCreateChannel(data)));
        this.data.editMessage.sub(data => this.handleCall('editMessage', this.onEditMessage(data)));
    }
    handleCall(name, call) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = new Date().getTime();
            const startNs = process.hrtime()[1]; // new Date().getTime();
            try {
                yield call;
            }
            catch (err) {
                this.onError(err);
            }
            const endNs = process.hrtime()[1];
            const end = new Date().getTime();
            console.log('TIMING', name, 'done in ', (end - start) + "ms; ", (endNs - startNs) + 'ns');
        });
    }
    onConnection(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            this.data.addSocket(socket);
            socket.on('disconnect', () => this.onDisconnect(socket));
        });
    }
    onDisconnect(socket) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    onListChannels(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const channels = this.db.getChannels()
                .filter(c => c.users.find(u => u.id === request.userId));
            yield this.emitAck(request.userId, request.PID, true, '', channels);
        });
    }
    onLoginRequest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.db.getUser(request.userId);
            if (user) {
                request._socket.join(request.userId);
                yield this.emitAck(request.userId, request.PID);
            }
            else {
                const newUser = this.db.createUser(request.userId, request.userId);
                yield this.emitAck(request.userId, request.PID);
                // await this.emitAck(request.userId, request.PID, false, 'Invalid username or password!');
            }
        });
    }
    onMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const msg = {
                    fromUser: message.userId,
                    text: message.Text,
                    id: message.MessageId
                };
                this.db.storeMessage(message.ChannelId, msg);
                message.SendAck = 0;
                yield this.data.emit(message, message._socket);
                yield this.emitAck(message.userId, message.PID, true, null, msg);
            }
            catch (err) {
                yield this.emitAck(message.userId, message.PID, false, err);
            }
        });
    }
    onEditMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedMessage = this.db.updateMessageText(message.ChannelId, message.messageId, message.text);
            yield this.emitAck(message.userId, message.PID, true, '', updatedMessage);
            yield this.data.emit(message);
        });
    }
    onCreateChannel(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.db.getUser(request.userId);
            const channel = this.db.createChannel(request.ChannelId, request.name);
            const userChannel = this.db.addUserToChannel(request.userId, request.ChannelId);
            yield this.emitAck(request.userId, request.PID, true, '', channel);
        });
    }
    onJoinChannel(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userChannel = this.db.addUserToChannel(request.userId, request.ChannelId);
                const event = new Models.UserJoinedChannel();
                event.userId = request.userId;
                event.ChannelId = request.ChannelId;
                event.user = userChannel;
                yield this.data.emit(event, request._socket);
                const channel = this.db.getChannel(request.ChannelId);
                yield this.emitAck(request.userId, request.PID, true, '', channel);
            }
            catch (err) {
                console.error(err);
                yield this.emitAck(request.userId, request.PID, false, err.toString());
            }
        });
    }
    onLeaveChannel(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userChannel = this.db.removeUserFromChannel(request.userId, request.ChannelId);
                yield this.emitAck(request.userId, request.PID);
                const event = new Models.UserLeftChannel();
                event.userId = request.userId;
                event.ChannelId = request.ChannelId;
                request._socket.leave(request.ChannelId);
                yield this.data.emit(event, request._socket);
            }
            catch (err) {
                yield this.emitAck(request.userId, request.PID, false, err);
            }
        });
    }
    onFollowChannel(request) {
        return __awaiter(this, void 0, void 0, function* () {
            request._socket.join(request.ChannelId);
            yield this.emitAck(request.userId, request.PID);
        });
    }
    onUnFollowChannel(request) {
        return __awaiter(this, void 0, void 0, function* () {
            request._socket.leave(request.ChannelId);
            yield this.emitAck(request.userId, request.PID);
        });
    }
    emitAck(channelId, PID, status = true, message = '', data = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const ack = new Models.Ack();
            ack.id = PID;
            ack.message = message;
            ack.status = status;
            ack.ChannelId = channelId;
            ack.data = data;
            yield this.data.emit(ack);
        });
    }
    onError(err) {
        console.error(err);
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=socket-server.js.map