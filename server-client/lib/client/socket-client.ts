import * as SocketIOClient from 'socket.io-client';

import { SocketData } from '../shared/socket-data';
import * as Models from '../shared/socket-data/models';
import * as StateModels from '../shared/models';
import { Channel } from '../shared/models/index';
import { store } from './store';
import { ActionTypes } from './actions';

export class SocketClient {

  data: SocketData;
  socket: SocketIOClient.Socket
  private userId: string = '123';

  constructor() { 
    this.socket = SocketIOClient('http://localhost');
    this.data = new SocketData(this.socket);

    this.data.message.sub((msg) => {
      const message = new StateModels.Message();
      message.id = msg.MessageId;
      message.text = msg.Text;
      message.fromUser = msg.userId;
      store.dispatch({type: ActionTypes.ADD_MESSAGE, data: message, userId: msg.userId, channelId: msg.ChannelId});
    });

    this.data.userJoinedChannel.sub((msg) => {
      store.dispatch({type: ActionTypes.ADD_USER, userId: msg.userId, channelId: msg.ChannelId, data: msg.user});
    });

    this.data.userLeftChannel.sub((msg) => {
      store.dispatch({type: ActionTypes.REMOVE_USER, userId: msg.userId, channelId: msg.ChannelId});
    });

    this.data.editMessage.sub((msg) => {
      store.dispatch({type: ActionTypes.EDIT_MESSAGE, userId: msg.userId, channelId: msg.ChannelId, data: {id: msg.messageId, text: msg.text}});
    });

  }

  setUserId(id: string) {
    this.userId = id;
  }

  async login(creds: any) {
    const request = new Models.LoginRequest();
    request.userId = this.userId;
    request.creds = creds;

    const response = await this.data.emit(request);
    
    if(response.status == false) {
      throw new Error(response.message);
    }

    return true;
  }

  async refreshChannels() { 
    const request = new Models.ListChannels();
    request.userId = this.userId;
    const response = await this.data.emit(request);
    
    if(response.status == false) {
      throw new Error(response.message);
    }

    store.dispatch({type: ActionTypes.SET_CHANNELS, data: response.data});

    return response.data as Channel[];
  }

  async createChannel(channelId: string) {
    const request = new Models.CreateChannel();
    request.ChannelId = channelId;
    request.userId = this.userId;
    request.name = channelId;
    const response = await this.data.emit(request);
    
    if(response.status == false) {
      throw new Error(response.message);
    }

    store.dispatch({type: ActionTypes.ADD_CHANNEL, data: response.data});
  }

  async joinChannel(channelId: string) { 
    const request = new Models.JoinChannel();
    request.ChannelId = channelId;
    request.userId = this.userId;
    const response = await this.data.emit(request);
    
    if(response.status == false) {
      throw new Error(response.message);
    }

    store.dispatch({type: ActionTypes.ADD_CHANNEL, data: response.data});

    return true;
  }

  async leaveChannel(channelId: string) { 
    const request = new Models.LeaveChannel();
    request.ChannelId = channelId;
    request.userId = this.userId;
    const response = await this.data.emit(request);
    
    if(response.status == false) {
      throw new Error(response.message);
    }

    store.dispatch({type: ActionTypes.REMOVE_CHANNEL, channelId: channelId});

    return true;
  }

  async followChannel(channelId: string) { 
    const request = new Models.FollowChannel();
    request.ChannelId = channelId;
    request.userId = this.userId;
    const response = await this.data.emit(request);
    
    if(response.status == false) {
      throw new Error(response.message);
    }

    return true;
  }

  async unfollowChannel(channelId: string) { 
    const request = new Models.UnFollowChannel();
    request.ChannelId = channelId;
    request.userId = this.userId;
    const response = await this.data.emit(request);
    
    if(response.status == false) {
      throw new Error(response.message);
    }

    return true;
  }
  
  async sendMessage(channelId: string, text: string) {
    const message = new Models.SocketMessage();
    message.ChannelId = channelId;
    message.userId = this.userId;
    message.Text = text;
    message.SendAck = 1;
    message.MessageId = Math.random().toString();
    

    const response = await this.data.emit(message);

    store.dispatch({type: ActionTypes.ADD_MESSAGE, channelId: channelId, data: response.data});
  }

  async editMessage(channelId: string, messageId: string, text: string) {
    const message = new Models.EditMessage();
    message.ChannelId = channelId;
    message.userId = this.userId;
    message.text = text;
    message.messageId = messageId;
    const response = await this.data.emit(message);
  }

  async setStatus(status: Models.SocketUserStatus) {
    const statusUpdate = new Models.SocketStatus();
    statusUpdate.userId = this.userId;
    statusUpdate.Status = status;

    this.data.emit(statusUpdate);
  }

}
