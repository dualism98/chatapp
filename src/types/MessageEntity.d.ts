interface MessageEntity {
  to: string;
  from: string;
  text: string;
  type: 'text' | 'audio' | 'video';
  src?: string;
}
