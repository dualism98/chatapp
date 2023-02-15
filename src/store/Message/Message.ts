import {makeAutoObservable} from 'mobx';
import {RootStore} from '../RootStore';

class Message {
  id: string;
  to: string;
  from: string;
  type: string;
  text?: string;
  src?: string;
  date: Date;
  status: MessageStatus;

  rootStore: RootStore;

  constructor(rootStore: RootStore, messageEntity: MessageEntity) {
    this.id = messageEntity.id;
    this.to = messageEntity.to;
    this.from = messageEntity.from;
    this.type = messageEntity.type;
    this.text = messageEntity.text;
    this.src = messageEntity.src ?? '';
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

  setSrc(src: string) {
    this.src = src;
  }
}

export default Message;
