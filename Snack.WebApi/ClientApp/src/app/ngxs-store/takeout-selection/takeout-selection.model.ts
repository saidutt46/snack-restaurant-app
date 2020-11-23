import { FoodItemModel } from './../../models/food-item.model';

export class TakeoutSelectionStateModel {
  itemsToDisplay: FoodItemModel[];
  loading: boolean;
  currentSelection: FoodItemModel[];
}
