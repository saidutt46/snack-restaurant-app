import { Observable } from 'rxjs';
import { UserStateSelector } from './../../ngxs-store/user/user.selector';
import { AuthenticationService } from './../../services/authentication.service';
import { LoginComponent } from './../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { UserActions } from 'src/app/ngxs-store/user/user.action';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Select(UserStateSelector.checkManagerialAccess) hasManagerialAccess$: Observable<boolean>;
  @Select(UserStateSelector.isAuthenticated) isAuthenticated$: Observable<boolean>;

  isAuthenticated: boolean;

  constructor(
    private dialog: MatDialog,
    private store: Store
  ) { }

  ngOnInit() {
    this.isAuthenticated$.subscribe(res => {
      this.isAuthenticated = res;
    });
  }

  userLogin() {
    this.dialog.open(LoginComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

  registerUser() {
    console.warn('register selected');
  }

  logout() {
    this.store.dispatch(new UserActions.Logout());
  }

}
