import {makeAutoObservable} from 'mobx';

class Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: MessageEntity;

  constructor(chat: ChatEntity) {
    this.id = chat.id;
    this.avatar = chat.avatar;
    this.name = chat.name;
    this.lastMessage = chat.lastMessage;
    makeAutoObservable(this);
  }

  setLastMessage(message: MessageEntity) {
    this.lastMessage = message;
  }
}

export default Chat;
