import { SocketPacket } from './packet';

export class EditMessage extends SocketPacket {
  messageId: string;
  text: string;
}
