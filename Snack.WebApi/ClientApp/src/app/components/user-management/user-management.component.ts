import { UserAddComponent } from './user-add/user-add.component';
import { LOGGING_SERV_TOKEN, ConsoleLoggingService } from './../../services/logging.service';
import { UserActions } from 'src/app/ngxs-store/user/user.action';
import { UserStateSelector } from 'src/app/ngxs-store/user/user.selector';
import { UserProfileModel } from './../../models/user-profile.model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDialog } from '@angular/material';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompanyRolesActions } from 'src/app/ngxs-store/company-roles/company-roles.action';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  currentUserSelected: UserProfileModel;
  @ViewChild('drawer', {static: true}) public drawer: MatDrawer;
  @Select(UserStateSelector.pageLoading) loading$: Observable<boolean>;
  @Select(UserStateSelector.formLoading) formLoading$: Observable<boolean>;


  constructor(
    private store: Store,
    @Inject(LOGGING_SERV_TOKEN) private logger: ConsoleLoggingService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.dispatch([
      new UserActions.GetAllUsers(),
      new CompanyRolesActions.ListAllCompanyRoles()
    ]);
  }

  updateEditForm(user: UserProfileModel) {
    this.drawer.open();
    this.currentUserSelected = user;
  }

  manageRoles() {
    this.logger.log('navigate to manage roles');
  }

  registerUser() {
    this.dialog.open(UserAddComponent, {
      width: '30%'
    });
  }

}
