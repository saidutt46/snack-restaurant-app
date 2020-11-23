import { TakeoutSelectionSelector } from './../../../ngxs-store/takeout-selection/takeout-selection.selector';
import { FoodItemModel } from './../../../models/food-item.model';
import { Observable } from 'rxjs';
import { FoodItemSelector } from 'src/app/ngxs-store/food-items/food-item.selector';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

export class CustomSelectionModel {
  type: string;
  value: any;
}

@Component({
  selector: 'app-takeout-selection',
  templateUrl: './takeout-selection.component.html',
  styleUrls: ['./takeout-selection.component.scss']
})
export class TakeoutSelectionComponent implements OnInit {
  @Select(TakeoutSelectionSelector.getItemsToDisplay) allItems$: Observable<FoodItemModel[]>;
  @Select(TakeoutSelectionSelector.getLoading) loading$: Observable<boolean>;
  choices: FoodItemModel[];

  constructor() { }

  ngOnInit() {
  }

}
