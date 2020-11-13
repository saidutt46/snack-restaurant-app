import { AuthenticationService } from './../../services/authentication.service';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './../../services/notification.service';
import { UserStateModel } from './user.model';
import { Action, State, StateContext } from '@ngxs/store';
import { Inject } from '@angular/core';
import { UserActions } from './user.action';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    userProfile: null,
    hasManagerialAccess: false,
    isAuthenticated: false
  }
})

export class UserState {
  constructor(
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private authService: AuthenticationService
  ) {}

  @Action(UserActions.LoginUser)
  loginUser({patchState}: StateContext<UserStateModel>, {payload}) {
    return this.authService.login(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res) => {
        if (res && res.token.length > 0) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('currentUser', res.userProfile.id);
          const token = localStorage.getItem('token');
          const roles = res.userProfile.roles;
          let hasAccess: boolean;
          if (roles && roles.length > 0) {
            hasAccess = roles.some(e => e === 'SuperUser' || 'Manager' || 'Admin');
          }
          patchState({
            userProfile: res.userProfile,
            isAuthenticated: token ? true : false,
            hasManagerialAccess: hasAccess
          });
          this.notifier.successNotification(`${res.userProfile.userName.toUpperCase()}: successfully logged In`);
        }
      })
    );
  }

  @Action([UserActions.Logout])
  logout({patchState, getState}: StateContext<UserStateModel>) {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    patchState({
      userProfile: null,
      isAuthenticated: false,
      hasManagerialAccess: false
    });
    this.notifier.successNotification(`successfully logged out`);
    return;
  }
}
