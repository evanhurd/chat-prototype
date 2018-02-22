import { SocketPacket } from './packet';
export declare class UnFollowChannel extends SocketPacket {
    ChannelId: string;
    SendAck: number;
}
