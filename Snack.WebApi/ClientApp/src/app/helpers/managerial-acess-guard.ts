import { forkJoin, Observable } from 'rxjs';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './../services/notification.service';
import { UserStateSelector } from '../ngxs-store/user/user.selector';
import { Select, Store } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManagerialAccessGuard implements CanActivate {
  @Select(UserStateSelector.checkManagerialAccess) managerAccess$: Observable<boolean>;
  @Select(UserStateSelector.isAuthenticated) isAuthenticated$: Observable<boolean>;
  constructor(
    private store: Store,
    private router: Router,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService
    ) { }
    canActivate(): boolean {
      // const hasAccess = this.store.selectSnapshot(UserStateSelector.checkManagerialAccess);
      // const userAuthenticated = this.store.selectSnapshot(UserStateSelector.isAuthenticated);
      const currentState = this.store.snapshot();
      const userState = currentState['user'];
      const hasAccess = userState.hasManagerialAccess;
      const userAuthenticated = userState.isAuthenticated;
      if (hasAccess && userAuthenticated) {
        console.log('access granted to the page');
        return true;
      } else {
        this.router.navigate(['home']);
        this.notifier.warningNotification('The current user has no access');
      }
      return false;

    }
}
