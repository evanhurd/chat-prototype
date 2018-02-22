import * as SocketIO from 'socket.io';

export class SocketPacket {
  ChannelId?: string;
  userId?: string;
  PID?: number;
  SendAck?: number;
  _socket?: SocketIO.Socket;
  _user?: any;
}