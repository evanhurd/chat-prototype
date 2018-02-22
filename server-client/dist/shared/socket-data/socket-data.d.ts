import { SocketDataMapper } from './socket-data-mapper';
import { SocketMessage, SocketPacket, SocketStatus, SocketUserStatus, LoginRequest, FollowChannel, JoinChannel, LeaveChannel, ListChannels, UnFollowChannel, UserJoinedChannel, UserLeftChannel, CreateChannel, EditMessage, Ack } from './models';
export declare class SocketData {
    private io;
    message: SocketDataMapper<SocketMessage>;
    statusChange: SocketDataMapper<SocketStatus>;
    socketUserStatus: SocketDataMapper<SocketUserStatus>;
    loginRequest: SocketDataMapper<LoginRequest>;
    ack: SocketDataMapper<Ack>;
    followChannel: SocketDataMapper<FollowChannel>;
    joinChannel: SocketDataMapper<JoinChannel>;
    leaveChannel: SocketDataMapper<LeaveChannel>;
    listChannels: SocketDataMapper<ListChannels>;
    unFollowChannel: SocketDataMapper<UnFollowChannel>;
    userJoinedChannel: SocketDataMapper<UserJoinedChannel>;
    userLeftChannel: SocketDataMapper<UserLeftChannel>;
    createChannel: SocketDataMapper<CreateChannel>;
    editMessage: SocketDataMapper<EditMessage>;
    constructor(io: any);
    addSocket(socket: any): Promise<void>;
    emit(packet: SocketPacket, emitFromSocket?: any): Promise<Ack>;
    private waitForAck(PID);
    private cleanPacket(packet);
}
