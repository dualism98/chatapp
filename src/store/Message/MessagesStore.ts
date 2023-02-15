import {makeAutoObservable, runInAction} from 'mobx';
import * as Keychain from 'react-native-keychain';

import GRPCService from '../../services/grpc/GRPC.service';
import {RootStore} from '../RootStore';
import Message from './Message';

class MessagesStore {
  messages: Message[];

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.messages = [];
    this.rootStore = rootStore;

    makeAutoObservable(this, {rootStore: false});
  }

  get messageById(): Record<string, Message> {
    return this.messages.reduce((acc, curr) => {
      // @ts-expect-error
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  messagesIdsByChatId(chatId: string) {
    return this.messages
      .filter(message => message.to === chatId || message.from === chatId)
      .map(message => message.id);
  }

  async loadChatMessages(chatId: string) {
    const unparsedMessages =
      await GRPCService.messagesGRPCService.loadMessagesHistory(chatId);
    runInAction(() => {
      this.messages = [
        ...this.messages,
        ...unparsedMessages
          .filter(
            unparsedMessage =>
              !this.messages.find(message => message.id === unparsedMessage.id),
          )
          .map(message => new Message(this.rootStore, message)),
      ];
    });
  }

  async sendTextMessage(text: string, chatId: string) {
    const user = await Keychain.getGenericPassword();
    const message: MessageEntity = {
      id: new Date().toString(),
      to: chatId,
      from: user.password,
      type: 'text',
      text,
      date: new Date().toString(),
    };
    this.addMessage(message);
    await GRPCService.messagesGRPCService.sendMessage(message);
  }

  addMessage(message: MessageEntity) {
    this.messages.unshift(new Message(this.rootStore, message));
  }
}

export default MessagesStore;
