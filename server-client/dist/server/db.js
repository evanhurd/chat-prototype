"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../shared/models/index");
const channels_1 = require("./fixtures/channels");
const users_1 = require("./fixtures/users");
class DB {
    storeMessage(channelId, message) {
        const channel = this.getChannel(channelId);
        if (!channel) {
            throw new Error("Invalid Channel");
        }
        channel.messages.push(message);
    }
    updateMessageText(channelId, messageId, text) {
        const channel = this.getChannel(channelId);
        if (!channel) {
            throw new Error("Invalid Channel");
        }
        const message = channel.messages.find(m => m.id === messageId);
        if (!message) {
            throw new Error("Invalid Channel");
        }
        message.text = text;
        return message;
    }
    createUser(id, name) {
        const user = new index_1.User();
        user.id = id;
        user.name = name;
        users_1.users.push(user);
        return user;
    }
    createChannel(id, name) {
        const channel = new index_1.Channel();
        channel.id = id;
        channel.name = name;
        channel.messages = [];
        channel.users = [];
        channels_1.channels.push(channel);
        return channel;
    }
    getUser(id) {
        return users_1.users.find(user => user.id === id);
    }
    getChannel(id) {
        return channels_1.channels.find(channel => channel.id === id);
    }
    getChannels() {
        return channels_1.channels;
    }
    addUserToChannel(userId, channelId) {
        const user = this.getUser(userId);
        const channel = this.getChannel(channelId);
        if (!channel) {
            throw Error('Channel Does not exist!');
        }
        if (channel.users.find(u => u.id === userId)) {
            throw Error('User Already in channel!');
        }
        const userChannel = {
            id: user.id,
            name: user.name,
            isAdmin: false
        };
        channel.users.push(userChannel);
        return userChannel;
    }
    removeUserFromChannel(userId, channelId) {
        const user = this.getUser(userId);
        const channel = this.getChannel(channelId);
        const index = channel.users.findIndex(u => u.id === userId);
        if (!channel.users.find(u => u.id === userId)) {
            throw Error('User is not in this channel!');
        }
        channel.users.splice(index, 1);
        return true;
    }
}
exports.DB = DB;
//# sourceMappingURL=db.js.map