import { FoodCategoryActions } from 'src/app/ngxs-store/food-category/food-category.action';
import { FoodItemModel } from './../../models/food-item.model';
import { FoodItemSelector } from './../../ngxs-store/food-items/food-item.selector';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { MatDialog, MatDrawer } from '@angular/material';
import { Observable } from 'rxjs';
import { FoodItemActions } from 'src/app/ngxs-store/food-items/food-item.action';
import { ItemsAddComponent } from './items-add/items-add.component';

@Component({
  selector: 'app-items-management',
  templateUrl: './items-management.component.html',
  styleUrls: ['./items-management.component.scss']
})
export class ItemsManagementComponent implements OnInit {
  @Select(FoodItemSelector.getPageLoading) loading$: Observable<boolean>;
  @Select(FoodItemSelector.getFormLoading) formLoading$: Observable<boolean>;
  @Select(FoodItemSelector.getAllItems) itemList$: Observable<FoodItemModel[]>;

  list: FoodItemModel[];
  currentItemSelected: FoodItemModel;
  @ViewChild('drawer', {static: true}) public drawer: MatDrawer;

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.store.dispatch([
      new FoodItemActions.ListAllItems(),
      new FoodCategoryActions.ListAllCategories()
    ]);
  }

  updateEditForm(item: FoodItemModel) {
    this.drawer.open();
    this.currentItemSelected = item;
  }

  addItem() {
    this.dialog.open(ItemsAddComponent, {
      width: '30%'
    });
  }

}
