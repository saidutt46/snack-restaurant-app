import { FoodCategoryModel } from './../../models/food-category.model';
import { Observable } from 'rxjs';
import { FoodCategorySelector } from './../../ngxs-store/food-category/food-category.selector';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FoodCategoryActions } from 'src/app/ngxs-store/food-category/food-category.action';
import { MatDrawer, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.scss']
})
export class CategoriesManagementComponent implements OnInit {
  @Select(FoodCategorySelector.getPageLoading) loading$: Observable<boolean>;
  @Select(FoodCategorySelector.getFormLoading) formLoading$: Observable<boolean>;
  list: FoodCategoryModel[];
  currentCategorySelected: FoodCategoryModel;
  @ViewChild('drawer', {static: true}) public drawer: MatDrawer;
  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new FoodCategoryActions.ListAllCategories());
  }

  updateEditForm(category: FoodCategoryModel) {
    this.drawer.open();
    this.currentCategorySelected = category;
  }

}
