import {GrpcClient, GrpcMetadata} from '@mitch528/react-native-grpc';

import * as Keychain from 'react-native-keychain';

const {CreateUserReq, User, UserReq, ChatList} = require('../../proto/chat_pb');

class ChatsGRPCService {
  async createUser(name: string): Promise<User> {
    try {
      const request = new CreateUserReq();
      request.setName(name);
      const data: Uint8Array = request.serializeBinary();
      const headers: GrpcMetadata = {};
      const {response} = await GrpcClient.unaryCall(
        '/ChatService/createUser',
        data,
        headers,
      );
      const user = new User.deserializeBinary(response);
      return user.toObject();
    } catch (err) {
      console.error('Error of creating user', err);
      throw new Error('Error of creating user');
    }
  }

  async getAllChats(): Promise<ChatEntity[]> {
    try {
      const user = await Keychain.getGenericPassword();
      const request = new UserReq();
      request.setUserid(user.password);
      const data: Uint8Array = request.serializeBinary();
      const headers: GrpcMetadata = {};
      const {response} = await GrpcClient.unaryCall(
        '/ChatService/getAllChats',
        data,
        headers,
      );
      const chats = new ChatList.deserializeBinary(response);
      return chats.toObject().chatsList;
    } catch (err) {
      console.error('Error of getting chats', err);
      throw new Error('Error of getting chats');
    }
  }
}

export default ChatsGRPCService;
