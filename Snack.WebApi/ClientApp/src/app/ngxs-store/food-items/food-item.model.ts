import { FoodItemModel } from './../../models/food-item.model';

export class FoodItemStateModel  {
  allItems: FoodItemModel[];
  selectedItem: FoodItemModel;
  loading: boolean;
  formLoading: boolean;
}
