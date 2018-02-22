import { SocketPacket } from './packet';
import { SocketPacketTypes, SocketUserStatus } from './enum';

export class SocketStatus extends SocketPacket {
  Type: SocketPacketTypes = SocketPacketTypes.Status
  Status: SocketUserStatus;
}
