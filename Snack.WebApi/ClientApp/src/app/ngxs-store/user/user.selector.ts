import { UserStateModel } from './user.model';
import { UserState } from './user.state';
import { Selector } from '@ngxs/store';

export class UserStateSelector {
  @Selector([UserState])
  static getUserProfile(state: UserStateModel) {
    return state.userProfile;
  }

  @Selector([UserState])
  static checkManagerialAccess(state: UserStateModel) {
    return state.hasManagerialAccess;
  }

  @Selector([UserState])
  static isAuthenticated(state: UserStateModel) {
    return state.isAuthenticated;
  }
}

