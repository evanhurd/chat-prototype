import * as SocketIOClient from 'socket.io-client';
import { SocketClient } from './socket-client';
import { Channel } from '../shared/models/index';
import { store } from './store';

let channels: Channel[] = [];

store.subscribe(() => console.log('STORE', JSON.stringify(store.getState())));

const client = new SocketClient();
client.setUserId('123');

async function main(client: SocketClient) {

  console.log('Attempting to Login');
  await client.login('123');

  await client.refreshChannels();

  console.log('END');
  
}


client.socket.on('connect', () => {
  main(client).catch(err => console.error(err));
});

