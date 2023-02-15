import {makeAutoObservable} from 'mobx';
import * as Keychain from 'react-native-keychain';
import GRPCService from '../../services/grpc/GRPC.service';

import {RootStore} from '../RootStore';

class UserStore {
  name: string | null;
  userId: string | null;

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.name = null;
    this.userId = null;
    this.rootStore = rootStore;
    this.checkAuthorization();
    makeAutoObservable(this, {rootStore: false});
  }

  async checkAuthorization() {
    const user = await Keychain.getGenericPassword();
    if (user) {
      return this.login(user.username, user.password);
    }
  }

  async login(name: string, userId: string) {
    this.name = name;
    this.userId = userId;
    GRPCService.messagesGRPCService.receiveMessages();
  }
}

export default UserStore;
