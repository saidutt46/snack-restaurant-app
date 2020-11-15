import { FoodCategoryModel } from './../../models/food-category.model';
export class FoodCategoryStateModel {
  allCategoris: FoodCategoryModel[];
  selectedCategory: FoodCategoryModel;
  loading: boolean;
  formLoading: boolean;
}
