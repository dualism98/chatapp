import axiosInstance from './axiosInstance';

class UserApiService {
  async createUser(name: string): Promise<User> {
    try {
      const response = await axiosInstance.post('/user', {name});
      return response.data;
    } catch (err: any) {
      console.error('Error of creating user', err);
      throw new Error('Error of creating user');
    }
  }
}

export default UserApiService;
