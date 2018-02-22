import { User } from './user';
import { ChannelUser } from './channel-user';
import { Message } from './message';

export class Channel {
  id: string;
  name: string;
  messages: Message[];
  users: ChannelUser[];
}
