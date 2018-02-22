import { Channel, Message, ChannelUser } from '../../shared/models/index';

export const channels: Channel[] = [
  {
    id: '1',
    name: 'Default',
    messages: [
      {
        fromUser: '123',
        id: '123',
        text: 'Hello World'
      }
    ],
    users: [
      {
        id: '123',
        isAdmin: true,
        name: 'Evan'
      }
    ]
  },
  {
    id: '2',
    name: 'Ivory Coast',
    messages: [],
    users: []
  }
];
