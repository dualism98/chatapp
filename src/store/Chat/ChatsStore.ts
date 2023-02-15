import {makeAutoObservable, runInAction} from 'mobx';

import GRPCService from '../../services/grpc/GRPC.service';
import {RootStore} from '../RootStore';
import Chat from './Chat';

class ChatsStore {
  chats: Chat[];

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.chats = [];
    this.rootStore = rootStore;

    makeAutoObservable(this, {rootStore: false});
  }

  get chatIds() {
    return this.chats.map(chat => chat.id);
  }

  get chatById(): Record<string, Chat> {
    return this.chats.reduce((acc, curr) => {
      // @ts-expect-error
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  async loadChats() {
    const chats = await GRPCService.chatsGRPCService.getAllChats();
    runInAction(() => {
      this.chats = chats.map(chat => new Chat(chat));
    });
  }
}

export default ChatsStore;
