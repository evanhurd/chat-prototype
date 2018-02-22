import { SocketPacket } from './packet';
import { SocketPacketTypes } from './enum';

export class SocketMessage extends SocketPacket {
  MessageId: string;
  Text: string;
  Type: SocketPacketTypes = SocketPacketTypes.Message;
}
