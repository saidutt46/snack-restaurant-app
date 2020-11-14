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
    private router: Router
  ) { }

  ngOnInit() {
  }

  manageInventory() {
    this.router.navigate(['manage']);
  }

}
