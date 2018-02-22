import { State } from '../shared/models/state';
import * as StateModels from '../shared/models';
import { Action, ActionTypes } from './actions';

export const setChannels = (state: State, action: Action): State => {
  state.channels = action.data || [];
  return state;
}

export const addChannel = (state: State, action: Action): State => {
  state.channels.push(action.data);
  return state;
}

export const removeChannel = (state: State, action: Action): State => {
  const index = state.channels.findIndex(c => c.id === action.channelId);
  if(index => 0) {
    state.channels.splice(index, 1);
  }
  return state;
}

export const addMessage = (state: State, action: Action): State => {
  let channel = state.channels.find(c => c.id == action.channelId);
  if (channel) {
    channel.messages = channel.messages || [];
    channel.messages.push(action.data);
  } else {
    console.error('Recieved message having no channel!');
  }
  return state;
}

export const editMessage = (state: State, action: Action): State => {
  let channel = state.channels.find(c => c.id == action.channelId);
  if (channel) {
    channel.messages = channel.messages || [];
    const message = channel.messages.find(m => m.id == action.data.id);
    if(message) {
      message.text = action.data.text;
    }
  } else {
    console.error('Edit message having no channel!');
  }
  return state;
}

export const setUsers = (state: State, action: Action): State => {
  let channel = state.channels.find(c => c.id == action.channelId);
  if (channel) {
    channel.messages = channel.messages || [];
    channel.messages.push(action.data);
  } else {
    console.error('Recieved users having no channel!');
  }
  return state;
}

export const addUser = (state: State, action: Action): State => {
  let channel = state.channels.find(c => c.id == action.channelId);
  if (channel) {
    channel.users.push(action.data);
  } else {
    console.error('Recieved user having no channel!');
  }

  return state;
}

export const removeUser = (state: State, action: Action): State => {
  let channel = state.channels.find(c => c.id == action.channelId);
  if (channel) {
    const index = channel.users.findIndex(u => u.id === action.userId);
    if(index >= 0) {
      channel.users.splice(index, 1);
    }
  } else {
    console.error('Tried removing user having no channel!');
  }

  return state;
}

