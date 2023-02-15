import {makeAutoObservable, runInAction} from 'mobx';
import {Asset} from 'react-native-image-picker';
import * as Keychain from 'react-native-keychain';

import ApiService from '../../services/api/Api.service';
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
    const date = new Date().toString();
    const message: MessageEntity = {
      id: date,
      to: chatId,
      from: user.password,
      type: 'text',
      text,
      date,
    };
    this.addMessage(message);
    await GRPCService.messagesGRPCService.sendMessage(message);
  }

  async sendVideoMessage(video: Asset, chatId: string) {
    const user = await Keychain.getGenericPassword();
    const date = new Date().toString();
    const message: MessageEntity = {
      id: date,
      to: chatId,
      from: user.password,
      type: 'video',
      src: video.uri,
      date,
    };
    ApiService.apiUploadService.uploadVideo(video, chatId, user.password);
    this.addMessage(message);
  }

  async sendAudioMessage(path: string, chatId: string) {
    const user = await Keychain.getGenericPassword();
    const date = new Date().toString();
    const messageEntity: MessageEntity = {
      id: date,
      to: chatId,
      from: user.password,
      type: 'audio',
      src: '',
      date,
    };
    const message = new Message(this.rootStore, messageEntity);
    runInAction(() => {
      this.messages.unshift(message);
    });
    const uploadData = await ApiService.apiUploadService.uploadAudio(
      path,
      chatId,
      user.password,
    );
    message.setSrc(uploadData.src);
  }

  addMessage(message: MessageEntity) {
    this.messages.unshift(new Message(this.rootStore, message));
  }
}

export default MessagesStore;
