import { createStore, Store } from 'redux';
import { State } from '../shared/models/state';
import { Action, ActionTypes } from './actions';
import * as StoreAction from './store-actions';

function reducer(state = new State(), action: Action) {

  switch(action.type) {
  case ActionTypes.SET_CHANNELS:  
    return StoreAction.setChannels(state, action);

  case ActionTypes.ADD_CHANNEL:
    return StoreAction.addChannel(state, action);

  case ActionTypes.REMOVE_CHANNEL:
    return StoreAction.removeChannel(state, action);

  case ActionTypes.SET_MESSAGES:
    return state;

  case ActionTypes.ADD_MESSAGE:
    return StoreAction.addMessage(state, action);
  
  case ActionTypes.EDIT_MESSAGE:
    return StoreAction.editMessage(state, action);
  
  case ActionTypes.SET_USERS:
    return StoreAction.setUsers(state, action);

  case ActionTypes.ADD_USER:
    return StoreAction.addUser(state, action);

  case ActionTypes.REMOVE_USER:
    return StoreAction.removeUser(state, action);

  default:
    return state
  }
}

export const store = createStore(reducer);

