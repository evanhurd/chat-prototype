import { Packet } from './packet';
import { PacketTypes } from './enum';
export declare class ReadAck extends Packet {
    Type: PacketTypes;
    MessageId: string;
}
