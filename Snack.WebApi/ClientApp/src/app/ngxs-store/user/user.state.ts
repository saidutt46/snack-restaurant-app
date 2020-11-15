import { UserProfileModel } from './../../models/user-profile.model';
import { AuthenticationService } from './../../services/authentication.service';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './../../services/notification.service';
import { UserStateModel } from './user.model';
import { Action, NgxsOnInit, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { UserActions } from './user.action';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@State<UserStateModel>({
  name: 'user',
  defaults: {
    userProfile: null,
    hasManagerialAccess: false,
    isAuthenticated: false,
    formLoading: false
  }
})

@Injectable()
export class UserState {
  constructor(
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private authService: AuthenticationService
  ) {}

  @Action(UserActions.LoginUser)
  loginUser({patchState}: StateContext<UserStateModel>, {payload}) {
    patchState({
      formLoading: true
    });
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
            const rolesWithAccess = roles.filter(e => e === 'SuperUser' || e === 'Manager' || e === 'Admin');
            hasAccess = rolesWithAccess.length > 0 ? true : false;
          }
          patchState({
            userProfile: res.userProfile,
            isAuthenticated: token ? true : false,
            hasManagerialAccess: hasAccess,
            formLoading: false
          });
          this.notifier.successNotification(`${res.userProfile.userName.toUpperCase()}: successfully logged In`);
        }
      })
    );
  }

  @Action([UserActions.Logout])
  logout({patchState}: StateContext<UserStateModel>) {
    patchState({
      userProfile: null,
      isAuthenticated: false,
      hasManagerialAccess: false
    });
    this.notifier.successNotification(`successfully logged out`);
    return;
  }

  @Action([UserActions.RefreshUserDetails])
  refreshUser({patchState}: StateContext<UserStateModel>, {payload}) {
    const id = localStorage.getItem('currentUser');
    patchState({
      ...patchState
    });
    return this.authService.getUserProfileById(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: UserProfileModel) => {
        if (res && res.id) {
          const roles = res.roles;
          let hasAccess: boolean;
          if (roles && roles.length > 0) {
            const rolesWithAccess = roles.filter(e => e === 'SuperUser' || e === 'Manager' || e === 'Admin');
            hasAccess = rolesWithAccess.length > 0 ? true : false;
          }
          patchState({
            userProfile: res,
            isAuthenticated: true,
            hasManagerialAccess: hasAccess
          });
        }
      })
    );
  }

}
