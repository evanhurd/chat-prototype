import { SocketPacket } from './packet';
import { ChannelUser } from '../../models/channel-user';
export declare class UserJoinedChannel extends SocketPacket {
    user: ChannelUser;
}
