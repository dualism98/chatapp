import {observer} from 'mobx-react-lite';
import React from 'react';

import {rootStore} from '../../store/RootStore';
import AudioMessage from './AudioMessage';
import TextMessage from './TextMessage';
import VideoMessage from './VideoMessage';

interface Props {
  messageId: string;
}

const Message: React.FC<Props> = observer(({messageId}) => {
  const message = rootStore.messagesStore.messageById[messageId];

  switch (message.type) {
    case 'text':
      return <TextMessage message={message} />;

    case 'video':
      return <VideoMessage message={message} />;

    case 'audio':
      return <AudioMessage message={message} />;

    default:
      return null;
  }
});

export default Message;
