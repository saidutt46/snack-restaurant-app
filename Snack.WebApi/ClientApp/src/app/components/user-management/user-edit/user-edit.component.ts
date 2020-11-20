import { UserStateSelector } from 'src/app/ngxs-store/user/user.selector';
import { UserProfileUpdateRequestModel } from './../../../models/requests/user-profile-update';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileModel } from './../../../models/user-profile.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompanyCustomRoleModel } from 'src/app/models/company-role.model';
import { CompanyRoleStateSelector } from 'src/app/ngxs-store/company-roles/company-roles.selector';
import { UserActions } from 'src/app/ngxs-store/user/user.action';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: UserProfileModel;
  @Output() closePanel: EventEmitter<any> = new EventEmitter<any>();
  @Select(CompanyRoleStateSelector.getAllRoles) roles$: Observable<CompanyCustomRoleModel[]>;
  @Select(UserStateSelector.formLoading) loading$: Observable<boolean>;
  allRoles = ['Admin', 'User', 'SuperUser', 'Manager', 'Cashier'];

  editForm: FormGroup;
  rolesForm: FormGroup;
  // currentRoles: string[];
  // otherRoles: string[];
  companyRoles: CompanyCustomRoleModel[];

  get currentUser() {
    return this.user;
  }

  @Input() set currentUser(val: UserProfileModel) {
    if (this.user !== val) {
      this.user = val;
      // this.configureRoles(val);
      this.createForm(val);
    }
  }
  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit() {
    this.roles$.subscribe(res => {
      this.companyRoles = res;
    });
  }

  // configureRoles(user: UserProfileModel) {
  //   this.otherRoles = this.allRoles.filter(e => user.roles.indexOf(e) === -1);
  //   this.currentRoles = this.allRoles.filter(e => user.roles.indexOf(e) !== -1);
  // }

  createForm(user: UserProfileModel) {
    this.editForm = this.fb.group({
      email: [user.email, [Validators.required]],
      userName: [user.userName, [Validators.required]],
      firstName: [user.firstName, [Validators.required]],
      lastName: [user.lastName, [Validators.required]],
      phoneNumber: [user.phoneNumber],
      dateOfBirth: [user.dateOfBirth, [Validators.required]],
      gender: [user.gender],
      designation: [user.designation, [Validators.required]]
    });
    this.updateRolesForm();
  }

  updateRolesForm() {
    this.rolesForm = this.fb.group({
      userRoles: new FormArray([])
    });
    this.addCheckboxes();
  }

  addCheckboxes() {
    this.allRoles.forEach(role => {
      if (this.user.roles.indexOf(role) > -1) {
        this.getRolesFormArray.push(new FormControl(true));
      } else {
        this.getRolesFormArray.push(new FormControl(false));
      }
    });
  }

  get getRolesFormArray() {
    return this.rolesForm.controls.userRoles as FormArray;
  }

  closeEdit() {
    this.closePanel.emit();
  }

  saveUser() {
    const model = new UserProfileUpdateRequestModel();
    model.email = this.getValueFromform('email');
    model.userName = this.getValueFromform('userName');
    model.firstName = this.getValueFromform('firstName');
    model.lastName = this.getValueFromform('lastName');
    model.phoneNumber = this.getValueFromform('phoneNumber');
    model.dateOfBirth = this.getValueFromform('dateOfBirth');
    model.designation = this.getValueFromform('designation');
    model.addRoles = this.getAddedRoles();
    model.removeRoles = this.getRemovedRoles();
    this.store.dispatch(new UserActions.UpdateUser(this.user.id, model)).subscribe(res => {
      console.warn('successfully');
      this.closePanel.emit();
    });
  }

  getAddedRoles() {
    const result = [];
    this.allRoles.forEach((role, index) => {
      if (this.user.roles.indexOf(role) === -1) {
        const array = this.getRolesFormArray;
        const checked: boolean = array.get(`${index}`).value;
        if (checked) {
          result.push(role);
        }
      }
    });
    return result;
  }

  getRemovedRoles() {
    const result = [];
    this.allRoles.forEach((role, index) => {
      if (this.user.roles.indexOf(role) > -1) {
        const array = this.getRolesFormArray;
        const checked: boolean = array.get(`${index}`).value;
        if (!checked) {
          result.push(role);
        }
      }
    });
    return result;
  }

  getValueFromform(val: string) {
    return this.editForm.get(val).value;
  }

  updateChange(e) {
    console.warn(e);
  }

  updateSelection(r: string) {
    console.warn(r);
  }

  getRoleName(index: number) {
    return this.allRoles[index];
  }

}
