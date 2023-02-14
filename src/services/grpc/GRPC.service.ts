import {GrpcClient} from '@mitch528/react-native-grpc';
import ChatsGRPCService from './ChatsGRPC.service';

const HOST = '0.0.0.0:9090';

class GRPCService {
  chatsGRPCService: ChatsGRPCService;

  constructor() {
    GrpcClient.setHost(HOST);
    GrpcClient.setInsecure(true);
    this.chatsGRPCService = new ChatsGRPCService();
  }
}

export default new GRPCService();
