import { SocketData } from '../shared/socket-data';
import * as Models from '../shared/socket-data/models';
import { DB } from './db';
export declare class SocketServer {
    private io;
    data: SocketData;
    db: DB;
    constructor(io: SocketIO.Server);
    handleCall(name: string, call: Promise<any>): Promise<void>;
    onConnection(socket: any): Promise<void>;
    onDisconnect(socket: any): Promise<void>;
    onListChannels(request: Models.ListChannels): Promise<void>;
    onLoginRequest(request: Models.LoginRequest): Promise<void>;
    onMessage(message: Models.SocketMessage): Promise<void>;
    onEditMessage(message: Models.EditMessage): Promise<void>;
    onCreateChannel(request: Models.CreateChannel): Promise<void>;
    onJoinChannel(request: Models.JoinChannel): Promise<void>;
    onLeaveChannel(request: Models.LeaveChannel): Promise<void>;
    onFollowChannel(request: Models.FollowChannel): Promise<void>;
    onUnFollowChannel(request: Models.UnFollowChannel): Promise<void>;
    emitAck(channelId: string, PID: number, status?: boolean, message?: string, data?: any): Promise<void>;
    private onError(err);
}
