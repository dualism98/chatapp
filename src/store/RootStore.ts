import ChatsStore from './Chat/ChatsStore';
import MessagesStore from './Message/MessagesStore';

export class RootStore {
  chatsStore: ChatsStore;
  messagesStore: MessagesStore;

  constructor() {
    this.chatsStore = new ChatsStore(this);
    this.messagesStore = new MessagesStore(this);
  }
}

export const rootStore = new RootStore();
