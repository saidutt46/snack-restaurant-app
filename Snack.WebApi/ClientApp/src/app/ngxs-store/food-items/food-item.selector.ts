import { FoodItemStateModel } from './food-item.model';
import { FoodItemState } from './food-item.state';
import { Selector } from '@ngxs/store';


export class FoodItemSelector {
  @Selector([FoodItemState])
  static getAllItems(state: FoodItemStateModel) {
    return state.allItems;
  }

  @Selector([FoodItemState])
  static getCurrentSelection(state: FoodItemStateModel) {
    return state.selectedItem;
  }

  @Selector([FoodItemState])
  static getPageLoading(state: FoodItemStateModel) {
    return state.loading;
  }

  @Selector([FoodItemState])
  static getFormLoading(state: FoodItemStateModel) {
    return state.formLoading;
  }
}
