import { SocketPacket } from './packet';

export class Ack extends SocketPacket {
  id: number;
  status: boolean;
  message: string;
  data: any;
}
