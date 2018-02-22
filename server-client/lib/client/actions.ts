export enum ActionTypes {
  SET_CHANNELS,
  ADD_CHANNEL,
  REMOVE_CHANNEL,

  SET_MESSAGES,
  ADD_MESSAGE,
  EDIT_MESSAGE,

  SET_USERS,
  ADD_USER,
  REMOVE_USER
}

export class Action {
  type: ActionTypes;
  data: any;
  userId: string;
  channelId: string;
}