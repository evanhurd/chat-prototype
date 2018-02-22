import { User, Message, Channel, ChannelUser } from '../shared/models/index';

import { channels } from './fixtures/channels';
import { users } from './fixtures/users';

export class DB {

  storeMessage(channelId: string, message: Message) {
    const channel = this.getChannel(channelId);
    if(!channel) {
      throw new Error("Invalid Channel");
    }
    channel.messages.push(message);
  }

  updateMessageText(channelId: string, messageId: string, text: string) {
    
    const channel = this.getChannel(channelId);
    if(!channel) {
      throw new Error("Invalid Channel");
    }

    const message = channel.messages.find(m => m.id === messageId);
    if(!message) {
      throw new Error("Invalid Channel");
    }

    message.text = text;
    return message;
  }

  createUser(id: string, name: string) {
    const user = new User();
    user.id = id;
    user.name = name;
    users.push(user);
    return user;
  }

  createChannel(id: string, name: string) {
    const channel = new Channel();
    channel.id = id;
    channel.name = name;
    channel.messages = [];
    channel.users = [];
    channels.push(channel);
    return channel;
  }

  getUser(id: string): User {
    return users.find(user => user.id === id);
  }

  getChannel(id: string): Channel {
    return channels.find(channel => channel.id === id);
  }

  getChannels() {
    return channels;
  }

  addUserToChannel(userId: string, channelId: string): ChannelUser {
    const user = this.getUser(userId);
    const channel = this.getChannel(channelId);

    if(!channel) {
      throw Error('Channel Does not exist!');
    }

    if(channel.users.find(u => u.id === userId)) {
      throw Error('User Already in channel!');
    }

    const userChannel = {
      id: user.id,
      name: user.name,
      isAdmin: false
    };

    channel.users.push(userChannel);

    return userChannel;
  }

  removeUserFromChannel(userId: string, channelId: string) {
    const user = this.getUser(userId);
    const channel = this.getChannel(channelId);

    const index = channel.users.findIndex(u => u.id === userId);

    if(!channel.users.find(u => u.id === userId)) {
      throw Error('User is not in this channel!');
    }

    channel.users.splice(index, 1);

    return true;
  }


}