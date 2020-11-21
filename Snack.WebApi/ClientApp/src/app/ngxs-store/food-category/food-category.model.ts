import { FoodItemModel } from './../../models/food-item.model';
import { FoodCategoryModel } from './../../models/food-category.model';
export class FoodCategoryStateModel {
  allCategoris: FoodCategoryModel[];
  selectedCategory: FoodCategoryModel;
  loading: boolean;
  formLoading: boolean;
  itemsByCategory: FoodItemModel[];
}
