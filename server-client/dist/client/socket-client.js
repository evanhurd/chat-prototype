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
const SocketIOClient = require("socket.io-client");
const socket_data_1 = require("../shared/socket-data");
const Models = require("../shared/socket-data/models");
const StateModels = require("../shared/models");
const store_1 = require("./store");
const actions_1 = require("./actions");
class SocketClient {
    constructor() {
        this.userId = '123';
        this.socket = SocketIOClient('http://localhost');
        this.data = new socket_data_1.SocketData(this.socket);
        this.data.message.sub((msg) => {
            const message = new StateModels.Message();
            message.id = msg.MessageId;
            message.text = msg.Text;
            message.fromUser = msg.userId;
            store_1.store.dispatch({ type: actions_1.ActionTypes.ADD_MESSAGE, data: message, userId: msg.userId, channelId: msg.ChannelId });
        });
        this.data.userJoinedChannel.sub((msg) => {
            store_1.store.dispatch({ type: actions_1.ActionTypes.ADD_USER, userId: msg.userId, channelId: msg.ChannelId, data: msg.user });
        });
        this.data.userLeftChannel.sub((msg) => {
            store_1.store.dispatch({ type: actions_1.ActionTypes.REMOVE_USER, userId: msg.userId, channelId: msg.ChannelId });
        });
        this.data.editMessage.sub((msg) => {
            store_1.store.dispatch({ type: actions_1.ActionTypes.EDIT_MESSAGE, userId: msg.userId, channelId: msg.ChannelId, data: { id: msg.messageId, text: msg.text } });
        });
    }
    setUserId(id) {
        this.userId = id;
    }
    login(creds) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Models.LoginRequest();
            request.userId = this.userId;
            request.creds = creds;
            const response = yield this.data.emit(request);
            if (response.status == false) {
                throw new Error(response.message);
            }
            return true;
        });
    }
    refreshChannels() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Models.ListChannels();
            request.userId = this.userId;
            const response = yield this.data.emit(request);
            if (response.status == false) {
                throw new Error(response.message);
            }
            store_1.store.dispatch({ type: actions_1.ActionTypes.SET_CHANNELS, data: response.data });
            return response.data;
        });
    }
    createChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Models.CreateChannel();
            request.ChannelId = channelId;
            request.userId = this.userId;
            request.name = channelId;
            const response = yield this.data.emit(request);
            if (response.status == false) {
                throw new Error(response.message);
            }
            store_1.store.dispatch({ type: actions_1.ActionTypes.ADD_CHANNEL, data: response.data });
        });
    }
    joinChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Models.JoinChannel();
            request.ChannelId = channelId;
            request.userId = this.userId;
            const response = yield this.data.emit(request);
            if (response.status == false) {
                throw new Error(response.message);
            }
            store_1.store.dispatch({ type: actions_1.ActionTypes.ADD_CHANNEL, data: response.data });
            return true;
        });
    }
    leaveChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Models.LeaveChannel();
            request.ChannelId = channelId;
            request.userId = this.userId;
            const response = yield this.data.emit(request);
            if (response.status == false) {
                throw new Error(response.message);
            }
            store_1.store.dispatch({ type: actions_1.ActionTypes.REMOVE_CHANNEL, channelId: channelId });
            return true;
        });
    }
    followChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Models.FollowChannel();
            request.ChannelId = channelId;
            request.userId = this.userId;
            const response = yield this.data.emit(request);
            if (response.status == false) {
                throw new Error(response.message);
            }
            return true;
        });
    }
    unfollowChannel(channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = new Models.UnFollowChannel();
            request.ChannelId = channelId;
            request.userId = this.userId;
            const response = yield this.data.emit(request);
            if (response.status == false) {
                throw new Error(response.message);
            }
            return true;
        });
    }
    sendMessage(channelId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new Models.SocketMessage();
            message.ChannelId = channelId;
            message.userId = this.userId;
            message.Text = text;
            message.SendAck = 1;
            message.MessageId = Math.random().toString();
            const response = yield this.data.emit(message);
            store_1.store.dispatch({ type: actions_1.ActionTypes.ADD_MESSAGE, channelId: channelId, data: response.data });
        });
    }
    editMessage(channelId, messageId, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new Models.EditMessage();
            message.ChannelId = channelId;
            message.userId = this.userId;
            message.text = text;
            message.messageId = messageId;
            const response = yield this.data.emit(message);
        });
    }
    setStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const statusUpdate = new Models.SocketStatus();
            statusUpdate.userId = this.userId;
            statusUpdate.Status = status;
            this.data.emit(statusUpdate);
        });
    }
}
exports.SocketClient = SocketClient;
//# sourceMappingURL=socket-client.js.map