import { UserProfileModel } from './../../models/user-profile.model';

export class UserStateModel {
  userProfile: UserProfileModel;
  hasManagerialAccess: boolean;
  isAuthenticated: boolean;
  formLoading: boolean;
  allUsers: UserProfileModel[];
  usersPageLoading: boolean;
}

export class AccessUpdateModel {
  managerialAccess: boolean;
  isAuthenticated: boolean;
}
