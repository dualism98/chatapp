import ChatsStore from './Chat/ChatsStore';
import MessagesStore from './Message/MessagesStore';
import UserStore from './User/UserStore';

export class RootStore {
  chatsStore: ChatsStore;
  messagesStore: MessagesStore;
  userStore: UserStore;

  constructor() {
    this.chatsStore = new ChatsStore(this);
    this.messagesStore = new MessagesStore(this);
    this.userStore = new UserStore(this);
  }
}

export const rootStore = new RootStore();
