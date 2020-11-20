import { UserRegisterModel } from './../../models/requests/user-register.model';
import { UserProfileUpdateRequestModel } from './../../models/requests/user-profile-update';
import { LoginRequestModel } from './../../models/login.model';

export namespace UserActions {

  export class LoginUser {
    static readonly type = '[USER] LOGIN';
    constructor(public payload: LoginRequestModel) { }
  }

  export class RegisterUser {
    static readonly type = '[USER] REGISTER';
    constructor(public payload: UserRegisterModel) { }
  }

  export class UpdateUser {
    static readonly type = '[USER] UPDATE';
    constructor(public id: string, public payload: UserProfileUpdateRequestModel) { }
  }

  export class Logout {
    static readonly type = '[USER] LOGOUT';
  }

  export class RefreshUserDetails {
    static readonly type = '[USER] REFRESH';
    constructor(public payload: string) { }
  }

  export class DeleteUser {
    static readonly type = '[USER] DELETE';
    constructor(public payload: string) { }
  }

  export class GetAllUsers {
    static readonly type = '[USER] LIST ALL';
  }
}
