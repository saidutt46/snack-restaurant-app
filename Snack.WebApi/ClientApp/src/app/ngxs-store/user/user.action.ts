import { LoginRequestModel } from './../../models/login.model';

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
}
