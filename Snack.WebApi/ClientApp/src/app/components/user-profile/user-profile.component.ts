import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserProfileModel } from './../../models/user-profile.model';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserStateSelector } from 'src/app/ngxs-store/user/user.selector';
import { UserActions } from 'src/app/ngxs-store/user/user.action';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @Select(UserStateSelector.getUserProfile) userProfile$: Observable<UserProfileModel>;
  @Select(UserStateSelector.isAuthenticated) isAuthenticated$: Observable<boolean>;
  profile: UserProfileModel;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.userProfile$.subscribe(res => {
      this.profile = res;
    });
  }

  getUserInitials(): string {
    const f = this.profile.firstName.charAt(0);
    const l = this.profile.lastName.charAt(0);
    return `${f}${l}`;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.store.dispatch(new UserActions.Logout());
    this.dialog.closeAll();
    this.router.navigate(['home']);
  }

}
