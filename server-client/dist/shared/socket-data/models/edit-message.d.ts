import { SocketPacket } from './packet';
export declare class EditMessage extends SocketPacket {
    messageId: string;
    text: string;
}
