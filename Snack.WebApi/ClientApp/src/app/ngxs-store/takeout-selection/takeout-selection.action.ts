import { FoodItemModel } from './../../models/food-item.model';
export namespace TakeoutSelectionActions {

  export class GetAllItems {
    static readonly type = '[ITEM] GET ALL';
  }

  export class GetItemsByCategory {
    static readonly type = '[ITEM] BY CATEGORY';
    constructor(public payload: string) { }
  }

  export class UpdateItemsSelection {
    static readonly type = '[ITEM] SELECTION UPDATE';
    constructor(public payload: FoodItemModel) { }
  }

  export class RemoveItemsSelection {
    static readonly type = '[ITEM] SELECTION UPDATE';
    constructor(public payload: FoodItemModel) { }
  }
}
