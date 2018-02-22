import { SocketPacket } from './packet';
export declare class ListChannels extends SocketPacket {
    joined: boolean;
    public: boolean;
    SendAck: number;
}
