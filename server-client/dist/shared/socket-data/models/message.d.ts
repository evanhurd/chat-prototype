import { SocketPacket } from './packet';
import { SocketPacketTypes } from './enum';
export declare class SocketMessage extends SocketPacket {
    MessageId: string;
    Text: string;
    Type: SocketPacketTypes;
}
