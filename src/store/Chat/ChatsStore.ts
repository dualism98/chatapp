import {makeAutoObservable, runInAction} from 'mobx';

import ApiService from '../../services/api/Api.service';
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
    return this.chats.map(chat => chat._id);
  }

  get chatById(): Record<string, Chat> {
    return this.chats.reduce((acc, curr) => {
      // @ts-expect-error
      acc[curr._id] = curr;
      return acc;
    }, {});
  }

  async loadChats() {
    const chats = await ApiService.chatsApiService.loadChats();
    runInAction(() => {
      this.chats = chats.map(chat => new Chat(chat));
    });
  }
}

export default ChatsStore;
