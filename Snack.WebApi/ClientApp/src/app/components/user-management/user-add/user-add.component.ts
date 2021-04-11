import { MatDialog } from '@angular/material';
import { UserRegisterModel } from './../../../models/requests/user-register.model';
import { Component, OnInit, Pipe } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CompanyCustomRoleModel } from 'src/app/models/company-role.model';
import { CompanyRoleStateSelector } from 'src/app/ngxs-store/company-roles/company-roles.selector';
import { UserStateSelector } from 'src/app/ngxs-store/user/user.selector';
import { UserActions } from 'src/app/ngxs-store/user/user.action';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  @Select(CompanyRoleStateSelector.getAllRoles) roles$: Observable<CompanyCustomRoleModel[]>;
  @Select(UserStateSelector.formLoading) loading$: Observable<boolean>;
  allRoles = ['Admin', 'User', 'SuperUser', 'Manager', 'Cashier'];

  addForm: FormGroup;
  rolesForm: FormGroup;
  companyRoles: CompanyCustomRoleModel[];
  hide = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.roles$.subscribe(res => {
      this.companyRoles = res;
    });
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(12)]],
      dateOfBirth: ['', [Validators.required]],
      designation: ['', [Validators.required]]
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
      this.getRolesFormArray.push(new FormControl(false, [Validators.required]));
    });
  }

  get getRolesFormArray() {
    return this.rolesForm.controls.userRoles as FormArray;
  }

  saveUser() {
    const model = new UserRegisterModel();
    model.email = this.getValueFromform('email');
    model.userName = this.getValueFromform('userName');
    model.firstName = this.getValueFromform('firstName');
    model.lastName = this.getValueFromform('lastName');
    model.password = this.getValueFromform('password');
    model.phoneNumber = this.getValueFromform('phoneNumber');
    model.dateJoined = new Date();
    model.gender = 1;
    model.dateOfBirth = this.getValueFromform('dateOfBirth');
    model.companyRoleId = this.getValueFromform('designation');
    model.userRoles = this.getRoles();
    console.warn(model);
    this.store.dispatch(new UserActions.RegisterUser(model)).subscribe(res => {
      this.dialog.closeAll();
    }, err =>  {
      this.dialog.closeAll();
    });
  }

  getRoles() {
    const result = [];
    this.allRoles.forEach((role, index) => {
      const array = this.getRolesFormArray;
      const checked: boolean = array.get(`${index}`).value;
        if (checked) {
          result.push(role);
        }
    });
    return result;
  }

  getValueFromform(val: string) {
    return this.addForm.get(val).value;
  }

  close() {
    this.dialog.closeAll();
  }

  getRoleName(index: number) {
    return this.allRoles[index];
  }

}
