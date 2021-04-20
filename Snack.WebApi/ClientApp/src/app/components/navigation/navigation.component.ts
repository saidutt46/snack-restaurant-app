import { UserAddComponent } from './../user-management/user-add/user-add.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { Observable } from 'rxjs';
import { UserStateSelector } from './../../ngxs-store/user/user.selector';
import { LoginComponent } from './../login/login.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { ManagerActions } from 'src/app/ngxs-store/manager/manager.action';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Select(UserStateSelector.checkManagerialAccess) hasManagerialAccess$: Observable<boolean>;
  @Select(UserStateSelector.isAuthenticated) isAuthenticated$: Observable<boolean>;
  themeOptions = ['indigo-pink', 'deeppurple-amber', 'pink-bluegrey', 'purple-green'];

  @Output() themeUpdated: EventEmitter<string> = new EventEmitter<string>();
  @Output() colorModeUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();


  isAuthenticated: boolean;
  isManager: boolean;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.isAuthenticated$.subscribe(res => {
      this.isAuthenticated = res;
    });
    this.hasManagerialAccess$.subscribe(res => {
      this.isManager = res;
    });
  }

  userLogin() {
    this.dialog.open(LoginComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

  userRegister() {
    this.dialog.open(UserAddComponent, {
      width: '30%',
      height: 'auto',
      panelClass: 'custom-dialog'
    });
  }

  registerUser() {
    console.warn('register selected');
  }

  openUserMenu() {
    this.dialog.open(UserProfileComponent, {
      width: '300px',
      position: {right: '50px', top: '80px'}
    });
  }

  updateTheme(e: any) {
    this.themeUpdated.emit(e.value);
  }

  updateToDarkTheme(e: any) {
    this.colorModeUpdated.emit(e.checked);
  }

}
function RegisterComponent(RegisterComponent: any) {
  throw new Error('Function not implemented.');
}

