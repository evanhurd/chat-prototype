import { SocketPacket } from './packet';

export class CreateChannel extends SocketPacket {
  name: string;
  SendAck = 1;
}
