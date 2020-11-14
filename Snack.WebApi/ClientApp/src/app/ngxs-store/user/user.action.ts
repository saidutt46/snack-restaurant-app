import { LoginRequestModel } from './../../models/login.model';
import { AccessUpdateModel } from './user.model';

export namespace UserActions {

  export class LoginUser {
    static readonly type = '[USER] LOGIN';
    constructor(public payload: LoginRequestModel) { }
  }

  export class RegisterUser {
    static readonly type = '[USER] REGISTER';
  }

  export class Logout {
    static readonly type = '[USER] LOGOUT';
  }

  export class RefreshUserDetails {
    static readonly type = '[USER] REFRESH';
    constructor(public payload: string) { }
  }
}
