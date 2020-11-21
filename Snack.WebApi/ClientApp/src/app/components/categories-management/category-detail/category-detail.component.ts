import { Router, ActivatedRoute } from '@angular/router';
import { FoodCategoryActions } from 'src/app/ngxs-store/food-category/food-category.action';
import { FoodCategoryModel } from './../../../models/food-category.model';
import { FoodItemModel } from './../../../models/food-item.model';
import { Observable } from 'rxjs';
import { FoodCategorySelector } from 'src/app/ngxs-store/food-category/food-category.selector';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  @Select(FoodCategorySelector.getFoodItems) foodItems$: Observable<FoodItemModel[]>;
  @Select(FoodCategorySelector.getCurrentSelection) category$: Observable<FoodCategoryModel>;
  @Select(FoodCategorySelector.getPageLoading) loading$: Observable<boolean>;

  category: FoodCategoryModel;
  foodItems: FoodItemModel[];

  categoryId: string;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.categoryId = res['id'];
    });
    if (this.categoryId) {
      this.store.dispatch([
        new FoodCategoryActions.GetCategoryById(this.categoryId),
        new FoodCategoryActions.GetFoodItemsByCategoryId(this.categoryId)
      ]);
    }
    this.category$.subscribe(res => {
      this.category = res;
    });
    this.foodItems$.subscribe(res => {
      this.foodItems = res;
    });
  }

  addCategory() {
    console.warn('add new category');
  }

}
