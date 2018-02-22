import { SocketData } from '../shared/socket-data';
import * as Models from '../shared/socket-data/models';
import * as StateModels from '../shared/models';
export declare class SocketClient {
    data: SocketData;
    socket: SocketIOClient.Socket;
    private userId;
    constructor();
    setUserId(id: string): void;
    login(creds: any): Promise<boolean>;
    refreshChannels(): Promise<StateModels.Channel[]>;
    createChannel(channelId: string): Promise<void>;
    joinChannel(channelId: string): Promise<boolean>;
    leaveChannel(channelId: string): Promise<boolean>;
    followChannel(channelId: string): Promise<boolean>;
    unfollowChannel(channelId: string): Promise<boolean>;
    sendMessage(channelId: string, text: string): Promise<void>;
    editMessage(channelId: string, messageId: string, text: string): Promise<void>;
    setStatus(status: Models.SocketUserStatus): Promise<void>;
}
