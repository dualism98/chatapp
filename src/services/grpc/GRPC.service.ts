import {GrpcClient} from '@mitch528/react-native-grpc';
import ChatsGRPCService from './ChatsGRPC.service';
import MessagesGRPCService from './MessagesGRPC.service';

const HOST = '0.0.0.0:9090';

class GRPCService {
  chatsGRPCService: ChatsGRPCService;
  messagesGRPCService: MessagesGRPCService;

  constructor() {
    GrpcClient.setHost(HOST);
    GrpcClient.setInsecure(true);
    this.chatsGRPCService = new ChatsGRPCService();
    this.messagesGRPCService = new MessagesGRPCService();
  }
}

export default new GRPCService();
