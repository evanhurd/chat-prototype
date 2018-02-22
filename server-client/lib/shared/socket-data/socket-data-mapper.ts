export class SocketDataMapper<T> {
  private _subsribers: any[] = [];
  private _prototype: any = null;

  constructor (prototype: any) {
    this._prototype = prototype;
  }

  addSocket(socket: any) {
    socket.on(this._prototype.name, (data) => this.processData(data, socket));
  }

  sub(cb: (data: T) => void) {
    this._subsribers.push(cb);
    return () => {
      const index = this._subsribers.indexOf(cb);
      this._subsribers.splice(index, 1);
      cb = null;
    };
  }

  private processData(rawData, socket: any) {
    console.log("RECV", this._prototype.name, JSON.stringify(rawData));
    const data = new this._prototype() as T;
    Object.assign(data, rawData);
    data['_socket'] = socket;
    this.emit(data);
  }

  private emit(data: T) {
    this._subsribers.forEach(cb => {
      try {
        cb(data);
      } catch(err) {
        console.error(err);
      }
    });
  }

}
