import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { TakeoutSelectionActions } from 'src/app/ngxs-store/takeout-selection/takeout-selection.action';

@Component({
  selector: 'app-takeout',
  templateUrl: './takeout.component.html',
  styleUrls: ['./takeout.component.scss']
})
export class TakeoutComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch([
      new TakeoutSelectionActions.GetAllItems()
    ]);
  }

}
