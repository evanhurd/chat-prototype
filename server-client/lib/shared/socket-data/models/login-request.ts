import { SocketPacket } from './packet';

export class LoginRequest extends SocketPacket {
  userId: string;
  creds: string;
  SendAck = 1;
}
