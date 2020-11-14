import { Router, ActivatedRoute } from '@angular/router';
import { ManagerService } from './../../services/manager.service';
import { ManagerAccessModel } from './../../ngxs-store/manager/manager.model';
import { Observable } from 'rxjs';
import { ManagerStateSelector } from './../../ngxs-store/manager/manager.selector';
import { Select, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { ManagerActions } from 'src/app/ngxs-store/manager/manager.action';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  @Select(ManagerStateSelector.getManagerAccessDetails) details$: Observable<ManagerAccessModel[]>;
  accessDetails: ManagerAccessModel[];
  cssClasses = ['one', 'two', 'three', 'four', 'five', 'six'];

  constructor(
    private store: Store,
    private service: ManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.store.dispatch(
      new ManagerActions.ManagerAccessDetails()
    );
    this.details$.subscribe(res => {
      if (res && res.length > 0) {
        res.map(p => {
          p.backgroundCss = this.cssClasses[Math.floor(Math.random() * this.cssClasses.length)];
        });
        this.accessDetails = res;
      }
    });
  }

  manageUserSelection(routeTo: string) {
    this.router.navigate([routeTo]);
  }


}
