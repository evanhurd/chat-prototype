"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketDataMapper {
    constructor(prototype) {
        this._subsribers = [];
        this._prototype = null;
        this._prototype = prototype;
    }
    addSocket(socket) {
        socket.on(this._prototype.name, (data) => this.processData(data, socket));
    }
    sub(cb) {
        this._subsribers.push(cb);
        return () => {
            const index = this._subsribers.indexOf(cb);
            this._subsribers.splice(index, 1);
            cb = null;
        };
    }
    processData(rawData, socket) {
        console.log("RECV", this._prototype.name, JSON.stringify(rawData));
        const data = new this._prototype();
        Object.assign(data, rawData);
        data['_socket'] = socket;
        this.emit(data);
    }
    emit(data) {
        this._subsribers.forEach(cb => {
            try {
                cb(data);
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.SocketDataMapper = SocketDataMapper;
//# sourceMappingURL=socket-data-mapper.js.map