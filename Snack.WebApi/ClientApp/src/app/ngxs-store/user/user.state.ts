import { AuthBaseResponse } from './../../models/base-response';
import { UserProfileModel } from './../../models/user-profile.model';
import { AuthenticationService } from './../../services/authentication.service';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './../../services/notification.service';
import { UserStateModel } from './user.model';
import { Action, State, StateContext, Store } from '@ngxs/store';
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
    formLoading: false,
    allUsers: [],
    usersPageLoading: false
  }
})

@Injectable()
export class UserState {
  constructor(
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private authService: AuthenticationService,
    private store: Store
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
      }, err => {
        patchState({
          formLoading: false
        });
        this.notifier.errorNotification(`Error: ${err.error}`);
      })
    );
  }

  @Action(UserActions.RegisterUser)
  registerUser({patchState}: StateContext<UserStateModel>, {payload}) {
    patchState({
      formLoading: true
    });
    return this.authService.registerUser(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res) => {
          patchState({
            formLoading: false
          });
          this.store.dispatch(new UserActions.GetAllUsers());
          this.notifier.successNotification(`${res.message}`);
      }, err => {
        patchState({
          formLoading: false
        });
        this.notifier.errorNotification(`Error: ${err.error.message}`);
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

  @Action([UserActions.GetAllUsers])
  listAllUsers({patchState}: StateContext<UserStateModel>) {
    patchState({
      usersPageLoading: true
    });
    return this.authService.getAllUsers().pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: UserProfileModel[]) => {
        if (res && res.length > 0) {
          patchState({
            allUsers: res,
            usersPageLoading: false
          });
        }
      })
    );
  }

  @Action([UserActions.UpdateUser])
  updateUser({patchState}: StateContext<UserStateModel>, {id, payload}) {
    patchState({
      formLoading: true
    });
    return this.authService.updateUserProfile(id, payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: UserProfileModel) => {
        if (res && res.id) {
          patchState({
            formLoading: false
          });
          this.notifier.successNotification('User profile updated successfully');
          this.store.dispatch(new UserActions.GetAllUsers());
        }
      })
    );
  }

  @Action([UserActions.DeleteUser])
  deleteUser({patchState}: StateContext<UserStateModel>, {payload}) {
    patchState({
      usersPageLoading: true
    });
    return this.authService.deleteUser(payload).pipe(
      catchError((x) => {
        return throwError(x);
      }),
      tap((res: AuthBaseResponse) => {
        if (res) {
          patchState({
            usersPageLoading: false
          });
          this.notifier.successNotification(res.message);
          this.store.dispatch(new UserActions.GetAllUsers());
        }
      }, err => {
        patchState({
          usersPageLoading: false
        });
        this.notifier.errorNotification(`Error: ${err.error.message}`);
      })
    );
  }

}
