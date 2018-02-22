import { SocketPacket } from './packet';
import { SocketPacketTypes } from './enum';
export declare class SocketReadAck extends SocketPacket {
    Type: SocketPacketTypes;
    MessageId: string;
}
