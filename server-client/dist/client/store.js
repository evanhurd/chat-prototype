"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const state_1 = require("../shared/models/state");
const actions_1 = require("./actions");
const StoreAction = require("./store-actions");
function reducer(state = new state_1.State(), action) {
    switch (action.type) {
        case actions_1.ActionTypes.SET_CHANNELS:
            return StoreAction.setChannels(state, action);
        case actions_1.ActionTypes.ADD_CHANNEL:
            return StoreAction.addChannel(state, action);
        case actions_1.ActionTypes.REMOVE_CHANNEL:
            return StoreAction.removeChannel(state, action);
        case actions_1.ActionTypes.SET_MESSAGES:
            return state;
        case actions_1.ActionTypes.ADD_MESSAGE:
            return StoreAction.addMessage(state, action);
        case actions_1.ActionTypes.EDIT_MESSAGE:
            return StoreAction.editMessage(state, action);
        case actions_1.ActionTypes.SET_USERS:
            return StoreAction.setUsers(state, action);
        case actions_1.ActionTypes.ADD_USER:
            return StoreAction.addUser(state, action);
        case actions_1.ActionTypes.REMOVE_USER:
            return StoreAction.removeUser(state, action);
        default:
            return state;
    }
}
exports.store = redux_1.createStore(reducer);
//# sourceMappingURL=store.js.map