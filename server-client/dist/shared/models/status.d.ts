import { Packet } from './packet';
import { PacketTypes, UserStatus } from './enum';
export declare class Status extends Packet {
    Type: PacketTypes;
    Status: UserStatus;
}
