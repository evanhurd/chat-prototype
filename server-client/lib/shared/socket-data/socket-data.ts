import { SocketDataMapper } from './socket-data-mapper'; 
import { SocketMessage,
         SocketPacket,
         SocketReadAck,
         SocketStatus,
         SocketUserStatus,
         LoginRequest,
         FollowChannel,
         JoinChannel,
         LeaveChannel,
         ListChannels,
         UnFollowChannel,
         UserJoinedChannel,
         UserLeftChannel,
         CreateChannel,
         EditMessage,
         Ack } from './models';

let idCounter = 0;

export class SocketData {
  
  message: SocketDataMapper<SocketMessage> = new SocketDataMapper<SocketMessage>(SocketMessage);
  statusChange: SocketDataMapper<SocketStatus> = new SocketDataMapper<SocketStatus>(SocketStatus);
  socketUserStatus: SocketDataMapper<SocketUserStatus> = new SocketDataMapper<SocketUserStatus>(SocketUserStatus);
  loginRequest: SocketDataMapper<LoginRequest> = new SocketDataMapper<LoginRequest>(LoginRequest);
  ack: SocketDataMapper<Ack> = new SocketDataMapper<Ack>(Ack);
  followChannel: SocketDataMapper<FollowChannel> = new SocketDataMapper<FollowChannel>(FollowChannel);
  joinChannel: SocketDataMapper<JoinChannel> = new SocketDataMapper<JoinChannel>(JoinChannel);
  leaveChannel: SocketDataMapper<LeaveChannel> = new SocketDataMapper<LeaveChannel>(LeaveChannel);
  listChannels: SocketDataMapper<ListChannels> = new SocketDataMapper<ListChannels>(ListChannels);
  unFollowChannel: SocketDataMapper<UnFollowChannel> = new SocketDataMapper<UnFollowChannel>(UnFollowChannel);
  userJoinedChannel: SocketDataMapper<UserJoinedChannel> = new SocketDataMapper<UserJoinedChannel>(UserJoinedChannel);
  userLeftChannel: SocketDataMapper<UserLeftChannel> = new SocketDataMapper<UserLeftChannel>(UserLeftChannel);
  createChannel: SocketDataMapper<CreateChannel> = new SocketDataMapper<CreateChannel>(CreateChannel);
  editMessage: SocketDataMapper<EditMessage> = new SocketDataMapper<EditMessage>(EditMessage);


  constructor(private io: any) {
    this.addSocket(io);
  }

  async addSocket(socket: any) {
    this.message.addSocket(socket);
    this.statusChange.addSocket(socket);
    this.socketUserStatus.addSocket(socket);
    this.loginRequest.addSocket(socket);
    this.ack.addSocket(socket);
    this.followChannel.addSocket(socket);
    this.joinChannel.addSocket(socket);
    this.leaveChannel.addSocket(socket);
    this.listChannels.addSocket(socket);
    this.unFollowChannel.addSocket(socket);
    this.userJoinedChannel.addSocket(socket);
    this.userLeftChannel.addSocket(socket);
    this.createChannel.addSocket(socket);
    this.editMessage.addSocket(socket);
  }

  async emit(packet: SocketPacket, emitFromSocket?: any): Promise<Ack>  {
    const type = (packet as any).constructor.name;
    packet = Object.assign({}, packet);
    const channelId = packet.ChannelId || packet.userId;
    packet.PID = idCounter++;
    const cleanPacket = this.cleanPacket(packet);

    console.log('SEND',type, JSON.stringify(cleanPacket));

    if(!channelId) {
      throw new Error('Cannot emit packet due to undefined channel and user IDs! ' + JSON.stringify(cleanPacket));
    }

    if(emitFromSocket) {
      emitFromSocket.to(channelId).emit(type, cleanPacket);
    } else if(this.io.to) {
      this.io.to(channelId).emit(type, cleanPacket);
    } else {
      this.io.emit(type, cleanPacket);
    }
    
    if(packet.SendAck) {
      return await this.waitForAck(packet.PID);
    }

    const ack = new Ack();
    ack.id = packet.PID;
    ack.status = true;
    return ack; 
  }

  private waitForAck(PID: number) {
    return new Promise<Ack>( (res, rej) => {
      const t = setTimeout(() => {
        console.error('Timeout wating for ACK!', PID);
        sub();
      }, 2000);
      const sub = this.ack.sub(ack => {
        if(ack.id === PID) {
          res(ack);
          sub();
          clearTimeout(t);
        }
      });
    });
  }

  private cleanPacket(packet: SocketPacket) {
    const clean = {};
    Object.assign(clean, packet);
    Object.keys(clean)
      .filter(key => key.startsWith('_'))
      .forEach(key => clean[key] = undefined);
    return clean;
  }

}
