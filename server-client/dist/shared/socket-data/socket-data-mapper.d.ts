export declare class SocketDataMapper<T> {
    private _subsribers;
    private _prototype;
    constructor(prototype: any);
    addSocket(socket: any): void;
    sub(cb: (data: T) => void): () => void;
    private processData(rawData, socket);
    private emit(data);
}
