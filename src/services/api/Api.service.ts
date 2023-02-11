import UserApiService from './UserApi.service';

class ApiService {
  userApiService: UserApiService;

  constructor() {
    this.userApiService = new UserApiService();
  }
}

export default new ApiService();
