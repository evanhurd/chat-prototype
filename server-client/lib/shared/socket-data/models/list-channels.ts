import { SocketPacket } from './packet';

export class ListChannels extends SocketPacket {
  joined: boolean;
  public: boolean;
  SendAck = 1;
}
