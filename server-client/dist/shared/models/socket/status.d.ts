import { SocketPacket } from './packet';
import { SocketPacketTypes, SocketUserStatus } from './enum';
export declare class SocketStatus extends SocketPacket {
    Type: SocketPacketTypes;
    Status: SocketUserStatus;
}
