import { SocketPacket } from './packet';
export declare class Ack extends SocketPacket {
    id: number;
    status: boolean;
    message: string;
    data: any;
}
