import { NOTIFICATION_SERV_TOKEN, INotificationService } from 'src/app/services';
import { UserStateSelector } from '../ngxs-store/user/user.selector';
import { Store } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthAccessGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: INotificationService
    ) { }
    canActivate(): boolean {
      // const hasAccess = this.store.selectSnapshot(UserStateSelector.checkManagerialAccess);
      // const userAuthenticated = this.store.selectSnapshot(UserStateSelector.isAuthenticated);
      const currentState = this.store.snapshot();
      const userState = currentState['user'];
      const userAuthenticated = userState.isAuthenticated;
      if (userAuthenticated) {
        console.log('access granted to the page');
        return true;
      } else {
        this.router.navigate(['home']);
        this.notifier.warningNotification('The current user has no access');
      }
      return false;
    }
}
