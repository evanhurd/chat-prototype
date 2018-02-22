import { SocketPacket } from './packet';
import { SocketPacketTypes } from './enum';

export class SocketReadAck extends SocketPacket {
  Type: SocketPacketTypes = SocketPacketTypes.ReadAck;
  MessageId: string;
}