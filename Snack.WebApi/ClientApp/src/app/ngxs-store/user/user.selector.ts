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

  @Selector([UserState])
  static formLoading(state: UserStateModel) {
    return state.formLoading;
  }

  @Selector([UserState])
  static pageLoading(state: UserStateModel) {
    return state.usersPageLoading;
  }

  @Selector([UserState])
  static getAllUsers(state: UserStateModel) {
    return state.allUsers;
  }
}

