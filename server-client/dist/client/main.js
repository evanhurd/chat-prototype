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
const socket_client_1 = require("./socket-client");
const store_1 = require("./store");
let channels = [];
store_1.store.subscribe(() => console.log('STORE', JSON.stringify(store_1.store.getState())));
const client = new socket_client_1.SocketClient();
client.setUserId('123');
function main(client) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Attempting to Login');
        yield client.login('123');
        yield client.refreshChannels();
        console.log('END');
    });
}
client.socket.on('connect', () => {
    main(client).catch(err => console.error(err));
});
//# sourceMappingURL=main.js.map