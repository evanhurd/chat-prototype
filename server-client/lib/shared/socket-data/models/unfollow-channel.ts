import { SocketPacket } from './packet';

export class UnFollowChannel extends SocketPacket {
  ChannelId: string;
  SendAck = 1;
}
