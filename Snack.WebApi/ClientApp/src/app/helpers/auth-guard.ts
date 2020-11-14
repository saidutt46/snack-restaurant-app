import { UserStateSelector } from '../ngxs-store/user/user.selector';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthAccessGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
    ) { }
    canActivate(): boolean {
      const userAuthenticated = this.store.selectSnapshot(UserStateSelector.isAuthenticated);
      if (!userAuthenticated) {
        this.router.navigate(['home']);
      }
      return userAuthenticated;
    }
}
