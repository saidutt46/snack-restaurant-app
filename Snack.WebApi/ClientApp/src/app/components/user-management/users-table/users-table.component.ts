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

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  hasRecords: boolean;
  users: UserProfileModel[];
  customRoles: CompanyCustomRoleModel[];
  displayedColumns: string[] = ['select', 'userName', 'firstName', 'lastName', 'email', 'designation', 'roles', 'actions'];
  dataSource = new MatTableDataSource<UserProfileModel>();
  selection = new SelectionModel<UserProfileModel>(true, []);
  @Output() userSelected: EventEmitter<UserProfileModel> = new EventEmitter<UserProfileModel>(undefined);
  @Select(UserStateSelector.getAllUsers) users$: Observable<UserProfileModel[]>;
  @Select(CompanyRoleStateSelector.getAllRoles) roles$: Observable<CompanyCustomRoleModel[]>;
  @Select(UserStateSelector.pageLoading) loading$: Observable<boolean>;


  constructor(
    protected store: Store,
    @Inject(LOGGING_SERV_TOKEN) protected logger: ConsoleLoggingService,
    @Inject(NOTIFICATION_SERV_TOKEN) protected notifier: INotificationService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.roles$.subscribe(roles => {
      this.customRoles = roles;
    });
    this.users$.subscribe(res => {
      this.hasRecords = res.length > 0 ? true : false;
      this.users = res;
      this.dataSource.data = this.users;
      this.selection.clear();
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserProfileModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.userName}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showEdit(row: UserProfileModel) {
    // console.warn(row);
    this.userSelected.emit(row);
  }

  registerUser() {
    console.log('users');
  }

  deleteSelected() {
    const selection = this.selection.selected;
    selection.forEach(selected => {
      this.store.dispatch(new UserActions.DeleteUser(selected.id));
    });
  }

  getRoleName(id: string): string {
    return this.customRoles.find(e => e.id === id).roleName;
  }

  addUser() {
    this.dialog.open(UserAddComponent, {
      width: '30%'
    });
  }

}
