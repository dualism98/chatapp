import axiosInstance from './axiosInstance';

class ChatsApiService {
  async loadChats(): Promise<ChatEntity[]> {
    try {
      const response = await axiosInstance.get('/user');
      return response.data;
    } catch (err) {
      console.error('Error of getting chats', err);
      throw new Error('Error of getting chats');
    }
  }

  async loadChatMessage(fromUserId: string) {
    try {
      const response = await axiosInstance.get(`/message?from=${fromUserId}`);
      return response.data;
    } catch (err) {
      console.error('Error of getting chat messages');
    }
  }
}

export default ChatsApiService;
