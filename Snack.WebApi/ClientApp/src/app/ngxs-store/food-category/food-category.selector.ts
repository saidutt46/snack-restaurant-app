import { FoodCategoryStateModel } from './food-category.model';
import { Selector } from '@ngxs/store';
import { FoodCategoryState } from './food-category.state';

export class FoodCategorySelector {

  @Selector([FoodCategoryState])
  static getAllCategories(state: FoodCategoryStateModel) {
    return state.allCategoris;
  }

  @Selector([FoodCategoryState])
  static getCurrentSelection(state: FoodCategoryStateModel) {
    return state.selectedCategory;
  }

  @Selector([FoodCategoryState])
  static getPageLoading(state: FoodCategoryStateModel) {
    return state.loading;
  }

  @Selector([FoodCategoryState])
  static getFormLoading(state: FoodCategoryStateModel) {
    return state.formLoading;
  }

  @Selector([FoodCategoryState])
  static getFoodItems(state: FoodCategoryStateModel) {
    return state.itemsByCategory;
  }
}
