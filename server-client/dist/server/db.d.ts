import { User, Message, Channel, ChannelUser } from '../shared/models/index';
export declare class DB {
    storeMessage(channelId: string, message: Message): void;
    updateMessageText(channelId: string, messageId: string, text: string): Message;
    createUser(id: string, name: string): User;
    createChannel(id: string, name: string): Channel;
    getUser(id: string): User;
    getChannel(id: string): Channel;
    getChannels(): Channel[];
    addUserToChannel(userId: string, channelId: string): ChannelUser;
    removeUserFromChannel(userId: string, channelId: string): boolean;
}
