interface Message {
  to: 'me' | 'user';
  from: 'me' | 'user';
  text: string;
  type: string;
}
