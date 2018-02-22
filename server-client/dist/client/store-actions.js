"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChannels = (state, action) => {
    state.channels = action.data || [];
    return state;
};
exports.addChannel = (state, action) => {
    state.channels.push(action.data);
    return state;
};
exports.removeChannel = (state, action) => {
    const index = state.channels.findIndex(c => c.id === action.channelId);
    if (index => 0) {
        state.channels.splice(index, 1);
    }
    return state;
};
exports.addMessage = (state, action) => {
    let channel = state.channels.find(c => c.id == action.channelId);
    if (channel) {
        channel.messages = channel.messages || [];
        channel.messages.push(action.data);
    }
    else {
        console.error('Recieved message having no channel!');
    }
    return state;
};
exports.editMessage = (state, action) => {
    let channel = state.channels.find(c => c.id == action.channelId);
    if (channel) {
        channel.messages = channel.messages || [];
        const message = channel.messages.find(m => m.id == action.data.id);
        if (message) {
            message.text = action.data.text;
        }
    }
    else {
        console.error('Edit message having no channel!');
    }
    return state;
};
exports.setUsers = (state, action) => {
    let channel = state.channels.find(c => c.id == action.channelId);
    if (channel) {
        channel.messages = channel.messages || [];
        channel.messages.push(action.data);
    }
    else {
        console.error('Recieved users having no channel!');
    }
    return state;
};
exports.addUser = (state, action) => {
    let channel = state.channels.find(c => c.id == action.channelId);
    if (channel) {
        channel.users.push(action.data);
    }
    else {
        console.error('Recieved user having no channel!');
    }
    return state;
};
exports.removeUser = (state, action) => {
    let channel = state.channels.find(c => c.id == action.channelId);
    if (channel) {
        const index = channel.users.findIndex(u => u.id === action.userId);
        if (index >= 0) {
            channel.users.splice(index, 1);
        }
    }
    else {
        console.error('Tried removing user having no channel!');
    }
    return state;
};
//# sourceMappingURL=store-actions.js.map