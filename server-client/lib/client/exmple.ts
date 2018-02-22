const socketData: any = {};
const createStore: any = {};
const StoreAction: any = {};
const State: any = {};
const Models: any = {};


// Define Socket Models


// DB
function updateMessageText(channelId, messageId, text) {
  const channel = this.getChannel(channelId);
  const message = channel.messages.find(m => m.id === messageId);
  message.text = text;
  return message;
}

// Server
socketData.editMessage.sub(message => onEditMessage(message));

async function onEditMessage(message) {
  const updatedMessage = this.db.updateMessageText(message.ChannelId, message.messageId, message.text);
  await this.emitAck(message.userId, message.PID, true, '', updatedMessage);
  await this.data.emit(message);
}


// Client API
async function editMessage(channelId, messageId, text) {
  const message = new Models.EditMessage();
  message.ChannelId = channelId;
  message.userId = this.userId;
  message.text = text;
  message.messageId = messageId;
  await this.data.emit(message);
}

socketData.editMessage.sub((msg) => {
  store.dispatch({type: ActionTypes.EDIT_MESSAGE, userId: msg.userId, channelId: msg.ChannelId, data: {id: msg.messageId, text: msg.text}});
});

// Redux
enum ActionTypes { EDIT_MESSAGE }

function reducer(state, action) {
  switch(action.type) {
  case ActionTypes.EDIT_MESSAGE:
    return StoreAction.editMessage(state, action);
  default:
    return state
  }
}

const store = createStore(reducer);

// Angular
export class AppComponent {
  state = new State();
  constructor() {
    store.subscribe(() => this.state = store.getState() );
  }
}
