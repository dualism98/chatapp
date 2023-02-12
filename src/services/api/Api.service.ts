import ChatsApiService from './ChatsApi.service';
import UserApiService from './UserApi.service';

class ApiService {
  userApiService: UserApiService;
  chatsApiService: ChatsApiService;

  constructor() {
    this.userApiService = new UserApiService();
    this.chatsApiService = new ChatsApiService();
  }
}

export default new ApiService();
