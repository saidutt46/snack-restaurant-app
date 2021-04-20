import { PSColumnDef, PSCustomColumnDef } from './../../shared-components/table-model/column-def';
import { UserAddComponent } from './../user-add/user-add.component';
import { UserActions } from 'src/app/ngxs-store/user/user.action';
import { CompanyCustomRoleModel } from './../../../models/company-role.model';
import { CompanyRoleStateSelector } from './../../../ngxs-store/company-roles/company-roles.selector';
import { UserStateSelector } from 'src/app/ngxs-store/user/user.selector';
import { UserProfileModel } from './../../../models/user-profile.model';
import { AfterViewInit, Component, EventEmitter, Inject, OnInit, Output, ViewChild, Pipe } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Select, Store } from '@ngxs/store';
import { NOTIFICATION_SERV_TOKEN, INotificationService } from 'src/app/services';
import { LOGGING_SERV_TOKEN, ConsoleLoggingService } from 'src/app/services/logging.service';
import { Observable } from 'rxjs';
import { BaseTableComponent } from '../../shared-components/base-table.component';
import { IPSColumn } from '../../shared-components/table-model/column-def';
import { CustomTableComponent } from '../../shared-components/custom-table/custom-table.component';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent extends BaseTableComponent<UserProfileModel> {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  hasRecords: boolean;
  users: UserProfileModel[];
  customRoles: CompanyCustomRoleModel[];
  @ViewChild('dt', { static: true }) dataTableComponent: CustomTableComponent<UserProfileModel>;
  readonly psColumnDefs: IPSColumn[];
  @Output() userSelected: EventEmitter<UserProfileModel> = new EventEmitter<UserProfileModel>(undefined);
  @Select(UserStateSelector.getAllUsers) users$: Observable<UserProfileModel[]>;
  @Select(CompanyRoleStateSelector.getAllRoles) roles$: Observable<CompanyCustomRoleModel[]>;
  @Select(UserStateSelector.pageLoading) loading$: Observable<boolean>;


  constructor(
    protected store: Store,
    @Inject(LOGGING_SERV_TOKEN) protected logger: ConsoleLoggingService,
    @Inject(NOTIFICATION_SERV_TOKEN) protected notifier: INotificationService,
    private dialog: MatDialog
    ) {
      super(store, logger, notifier);
      this.roles$.subscribe(res => {
        this.customRoles = res;
      });
      this.psColumnDefs = [
        PSColumnDef.create('userName', 'User Name'),
        PSColumnDef.create('firstName', 'First Name'),
        PSColumnDef.create('lastName', 'Last Name'),
        PSColumnDef.create('email', 'Email'),
        PSCustomColumnDef.create('designation', 'Designation', undefined, undefined,
        (x: UserProfileModel) => this.getRoleName(x.designation)),
        PSCustomColumnDef.create('roles', 'System Roles'),
        PSCustomColumnDef.create('actions', 'Actions')
      ];
     }

  recordSelected(row: UserProfileModel) {
    this.userSelected.emit(row);
  }

  registerUser() {
    console.log('users');
  }

  // deleteSelected() {
  //   const selection = this.selection.selected;
  //   selection.forEach(selected => {
  //     this.store.dispatch(new UserActions.DeleteUser(selected.id));
  //   });
  // }

  getRoleName(id: string): string {
    return this.customRoles.find(e => e.id === id).roleName;
  }

  addUser() {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(res => {
      this.store.dispatch([
        new UserActions.GetAllUsers()
      ]);
    });

  }

}
