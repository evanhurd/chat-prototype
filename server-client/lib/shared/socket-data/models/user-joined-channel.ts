import { SocketPacket } from './packet';
import { ChannelUser } from '../../models/channel-user';

export class UserJoinedChannel extends SocketPacket {
  user: ChannelUser;
}
