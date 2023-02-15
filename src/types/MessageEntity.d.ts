interface MessageEntity {
  id: string;
  to: string;
  from: string;
  text?: string;
  type: 'text' | 'audio' | 'video';
  src?: string;
  date: string;
  status?: MessageStatus;
}

type MessageStatus = 'sent' | 'sending' | 'failure';
