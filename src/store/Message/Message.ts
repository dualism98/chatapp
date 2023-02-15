import {makeAutoObservable} from 'mobx';
import {RootStore} from '../RootStore';

class Message {
  id: string;
  to: string;
  from: string;
  type: string;
  text?: string;
  date: Date;
  status: MessageStatus;

  rootStore: RootStore;

  constructor(rootStore: RootStore, messageEntity: MessageEntity) {
    this.id = messageEntity.id;
    this.to = messageEntity.to;
    this.from = messageEntity.from;
    this.type = messageEntity.type;
    this.text = messageEntity.text;
    this.date = new Date(messageEntity.date);
    this.status = messageEntity.status ?? 'sent';

    this.rootStore = rootStore;

    makeAutoObservable(this, {rootStore: false});
  }

  setStatus(status: MessageStatus) {
    this.status = status;
  }

  setId(id: string) {
    this.id = id;
  }
}

export default Message;
