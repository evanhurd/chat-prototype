import { ChannelUser } from './channel-user';
import { Message } from './message';
export declare class Channel {
    id: string;
    name: string;
    messages: Message[];
    users: ChannelUser[];
}
