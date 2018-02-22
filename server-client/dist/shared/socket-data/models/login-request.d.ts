import { SocketPacket } from './packet';
export declare class LoginRequest extends SocketPacket {
    userId: string;
    creds: string;
    SendAck: number;
}
