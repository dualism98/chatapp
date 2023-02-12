import ChatsStore from './Chat/ChatsStore';

export class RootStore {
  chatsStore: ChatsStore;

  constructor() {
    this.chatsStore = new ChatsStore(this);
  }
}

export const rootStore = new RootStore();
