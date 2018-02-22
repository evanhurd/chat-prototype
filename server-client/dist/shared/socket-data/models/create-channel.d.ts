import { SocketPacket } from './packet';
export declare class CreateChannel extends SocketPacket {
    name: string;
    SendAck: number;
}
