import { LoginComponent } from './../login/login.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserStateSelector } from 'src/app/ngxs-store/user/user.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Select(UserStateSelector.checkManagerialAccess) hasManagerialAccess$: Observable<boolean>;


  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  manageInventory() {
    this.router.navigate(['manage']);
  }

  takeOut() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.router.navigate(['takeout']);
    } else {
      const ref = this.dialog.open(LoginComponent, {
        width: '30%'
      });
      ref.afterClosed().subscribe(res => {
        if (res && res === 'success') {
          this.router.navigate(['takeout']);
        }
      });
    }
  }

}
