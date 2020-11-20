import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserStateSelector } from 'src/app/ngxs-store/user/user.selector';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from './../../services/notification.service';
import { LoginRequestModel } from './../../models/login.model';
import { MatDialog } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { UserActions } from 'src/app/ngxs-store/user/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Select(UserStateSelector.formLoading) loading$: Observable<boolean>;
  loginForm: FormGroup;
  hide: false;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    @Inject(NOTIFICATION_SERV_TOKEN) private notifier: NotificationService,
    private store: Store
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ]]
    });
  }

  close() {
    this.dialog.closeAll();
  }

  save() {
    const model = new LoginRequestModel();
    model.username = this.loginForm.get('username').value;
    model.password = this.loginForm.get('password').value;
    this.store.dispatch(new UserActions.LoginUser(model)).subscribe(res => {
      this.dialog.closeAll();
    }, err =>  {
      this.dialog.closeAll();
    });
  }
}
