import { SocketData } from '../shared/socket-data';
import * as Models from '../shared/socket-data/models';
import * as SocketIO from 'socket.io';
import { DB } from './db';

export class SocketServer {

  private io: any;
  data: SocketData;
  db = new DB();

  constructor(io: SocketIO.Server) {
    this.data = new SocketData(io);
    this.io = io;
    this.io.on('connection', socket => this.onConnection(socket));

    this.data.message.sub(data => this.handleCall('message', this.onMessage(data)));
    this.data.loginRequest.sub(data => this.handleCall('loginRequest', this.onLoginRequest(data)));
    this.data.followChannel.sub(data => this.handleCall('followChannel', this.onFollowChannel(data)));
    this.data.listChannels.sub(data => this.handleCall('listChannels', this.onListChannels(data)));
    this.data.joinChannel.sub(data => this.handleCall('joinChannel', this.onJoinChannel(data)));
    this.data.leaveChannel.sub(data => this.handleCall('leaveChannel', this.onLeaveChannel(data)));
    this.data.createChannel.sub(data => this.handleCall('createChannel', this.onCreateChannel(data)));
    this.data.editMessage.sub(data => this.handleCall('editMessage', this.onEditMessage(data)));

  }

  async handleCall(name: string, call: Promise<any>) {

    const start = new Date().getTime();
    const startNs = process.hrtime()[1]; // new Date().getTime();
    try {
      await call;
    } catch(err) {
      this.onError(err);
    }
    const endNs = process.hrtime()[1];
    const end = new Date().getTime();

    console.log('TIMING', name, 'done in ', (end - start) + "ms; ", (endNs - startNs) + 'ns');
  }

  async onConnection(socket: any) {
    this.data.addSocket(socket);
    socket.on('disconnect', () => this.onDisconnect(socket));
  }

  async onDisconnect(socket: any) { }

  async onListChannels(request: Models.ListChannels) {
    const channels = this.db.getChannels()
    .filter(c => c.users.find(u => u.id === request.userId));
    await this.emitAck(request.userId, request.PID, true, '', channels);
  }

  async onLoginRequest(request: Models.LoginRequest) {
    const user = this.db.getUser(request.userId);
    if(user) {
      request._socket.join(request.userId);
      await this.emitAck(request.userId, request.PID);
    } else {
      const newUser = this.db.createUser(request.userId, request.userId);
      await this.emitAck(request.userId, request.PID);
      // await this.emitAck(request.userId, request.PID, false, 'Invalid username or password!');
    }
  }

  async onMessage(message: Models.SocketMessage) {
    try {
      const msg = {
        fromUser: message.userId,
        text: message.Text,
        id: message.MessageId
      };
      this.db.storeMessage(message.ChannelId, msg);
      message.SendAck = 0;
      await this.data.emit(message, message._socket);
      await this.emitAck(message.userId, message.PID, true, null, msg);
    } catch(err) {
      await this.emitAck(message.userId, message.PID, false, err);
    }
  }

  async onEditMessage(message: Models.EditMessage) {
    const updatedMessage = this.db.updateMessageText(message.ChannelId, message.messageId, message.text);
    await this.emitAck(message.userId, message.PID, true, '', updatedMessage);
    await this.data.emit(message);
  }

  async onCreateChannel(request: Models.CreateChannel) {
    const user = this.db.getUser(request.userId);
    const channel = this.db.createChannel(request.ChannelId, request.name);
    const userChannel = this.db.addUserToChannel(request.userId, request.ChannelId);
    await this.emitAck(request.userId, request.PID, true, '', channel);
  }

  async onJoinChannel(request: Models.JoinChannel) {
    try {
      const userChannel = this.db.addUserToChannel(request.userId, request.ChannelId);
      const event = new Models.UserJoinedChannel();
      event.userId = request.userId;
      event.ChannelId = request.ChannelId;
      event.user = userChannel;
      await this.data.emit(event, request._socket);
      const channel = this.db.getChannel(request.ChannelId);
      await this.emitAck(request.userId, request.PID, true, '', channel);
    } catch(err) {
      console.error(err);
      await this.emitAck(request.userId, request.PID, false, err.toString());
    }
  }

  async onLeaveChannel(request: Models.LeaveChannel) {
    try {
      const userChannel = this.db.removeUserFromChannel(request.userId, request.ChannelId);
      await this.emitAck(request.userId, request.PID);
      const event = new Models.UserLeftChannel();
      event.userId = request.userId;
      event.ChannelId = request.ChannelId;
      request._socket.leave(request.ChannelId);
      await this.data.emit(event, request._socket);
    } catch(err) {
      await this.emitAck(request.userId, request.PID, false, err);
    }
  }

  async onFollowChannel(request: Models.FollowChannel) {
    request._socket.join(request.ChannelId);
    await this.emitAck(request.userId, request.PID);
  }

  async onUnFollowChannel(request: Models.UnFollowChannel) {
    request._socket.leave(request.ChannelId);
    await this.emitAck(request.userId, request.PID);
  }


  async emitAck(channelId: string, PID: number, status = true, message = '', data = null) {
    const ack = new Models.Ack();
    ack.id = PID;
    ack.message = message;
    ack.status = status;
    ack.ChannelId = channelId;
    ack.data = data;
    await this.data.emit(ack);
  }

  private onError(err) {
    console.error(err);
  }

}