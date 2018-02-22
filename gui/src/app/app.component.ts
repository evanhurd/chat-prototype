import { Component } from '@angular/core';

import { SocketClient, store, State, Channel, Message } from '../../../chat-prototype/lib/client/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  client = new SocketClient();
  state: State = new State();
  activeChannel: Channel;
  newMessageText: string = '';
  
  constructor() {
    store.subscribe(() => {
      this.state = store.getState();
      if (this.activeChannel) {
        this.focusChannel(this.state.channels.find(c => c.id === this.activeChannel.id) || this.state.channels[0]);
      } else if(this.state.channels[0]) {
        this.focusChannel(this.state.channels[0]);
      }
      console.log(this.state);
    });

    this.client.socket.on('connect', () => this.load())
  }

  async load() {
    this.client.setUserId(this.getUserId());
    await this.client.login('123');
    await this.client.refreshChannels();
  }

  getUserId(): string {
    return location.href.split('?id=')[1];
  }

  focusChannel(channel: Channel) {
    this.activeChannel = channel;
    this.client.followChannel(this.activeChannel.id);
  }
  
  onKeyPress($event: KeyboardEvent) {
    if($event.keyCode === 13) {
      this.sendMessage();
    }
  }

  async sendMessage() {
    if(this.newMessageText.trim() && this.activeChannel) {
      await this.client.sendMessage(this.activeChannel.id, this.newMessageText);
      this.newMessageText = '';
    }
  }

  async joinChannel() {
    const id = prompt('Enter Channel ID');
    if(id.trim()) {
      await this.client.joinChannel(id);
      const channel = this.state.channels.find(c => c.id === id);
      this.focusChannel(channel);
    }
  }

  async createChannel() {
    const id = prompt('Enter New Channel ID');
    if(id.trim()) {
      await this.client.createChannel(id);
      const channel = this.state.channels.find(c => c.id === id);
      this.focusChannel(channel);
    }
  }

  async leaveChannel() {
    if(this.activeChannel) {
      await this.client.leaveChannel(this.activeChannel.id);
    }
  }

  async editMessage(message: Message) {
    const newText = prompt('Enter New Channel ID', message.text);
    if(newText.trim()) {
      await this.client.editMessage(this.activeChannel.id, message.id, newText);
    }
  }
 
}
