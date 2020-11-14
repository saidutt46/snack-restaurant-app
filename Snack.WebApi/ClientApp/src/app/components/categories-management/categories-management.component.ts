import { FoodCategoryModel } from './../../models/food-category.model';
import { Observable } from 'rxjs';
import { FoodCategorySelector } from './../../ngxs-store/food-category/food-category.selector';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FoodCategoryActions } from 'src/app/ngxs-store/food-category/food-category.action';

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.scss']
})
export class CategoriesManagementComponent implements OnInit {
  @Select(FoodCategorySelector.getPageLoading) loading$: Observable<boolean>;
  @Select(FoodCategorySelector.getFormLoading) formLoading$: Observable<boolean>;
  @Select(FoodCategorySelector.getAllCategories) categoriesList$: Observable<FoodCategoryModel[]>;
  list: FoodCategoryModel[];
  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new FoodCategoryActions.ListAllCategories());
    this.categoriesList$.subscribe(r => {
      console.warn(r);
      this.list = r;
    });
  }

}
