import {GrpcClient, GrpcMetadata} from '@mitch528/react-native-grpc';
import * as Keychain from 'react-native-keychain';
import { rootStore } from '../../store/RootStore';
const {
  MessageHistoryReq,
  MessagesList,
  ChatMessage,
  UserReq,
} = require('../../proto/chat_pb');

class MessagesGRPCService {
  async loadMessagesHistory(chatId: string): Promise<MessageEntity[]> {
    try {
      const user = await Keychain.getGenericPassword();
      const request = new MessageHistoryReq();
      request.setUserid(user.password);
      request.setChatid(chatId);
      const data: Uint8Array = request.serializeBinary();
      const headers: GrpcMetadata = {};
      const {response} = await GrpcClient.unaryCall(
        '/ChatService/getMessagesHistory',
        data,
        headers,
      );
      const messages = new MessagesList.deserializeBinary(response);
      return messages.toObject().messagesList;
    } catch (err) {
      console.error('Error of getting chat history', err);
      throw new Error('Error of getting chat history');
    }
  }

  async sendMessage(message: MessageEntity) {
    try {
      const request = new ChatMessage();
      request.setTo(message.to);
      request.setFrom(message.from);
      request.setType(message.type);
      request.setText(message.text);
      request.setDate(message.date);
      const data: Uint8Array = request.serializeBinary();
      const headers: GrpcMetadata = {};
      await GrpcClient.unaryCall('/ChatService/sendMessage', data, headers);
    } catch (err) {
      console.error('Error of sending message', err);
      throw new Error('Error of sending message');
    }
  }

  async receiveMessages() {
    const user = await Keychain.getGenericPassword();
    const request = new UserReq();
    request.setUserid(user.password);
    const data: Uint8Array = request.serializeBinary();
    const headers: GrpcMetadata = {};
    const stream = GrpcClient.serverStreamCall(
      '/ChatService/receiveMessages',
      data,
      headers,
    );

    stream.responses.on('data', data => {
      const message = new ChatMessage.deserializeBinary(data);
      rootStore.messagesStore.addMessage(message.toObject());
    });
  }
}

export default MessagesGRPCService;
