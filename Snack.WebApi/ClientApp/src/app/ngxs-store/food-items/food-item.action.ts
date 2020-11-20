import { FoodItemRequest } from './../../models/food-item.model';

export namespace FoodItemActions {

  export class ListAllItems {
    static readonly type = '[ITEM] GET ALL';
  }

  export class GetItemById {
    static readonly type = '[ITEM] GET BY ID';
    constructor(public payload: string) { }
  }

  export class CreateItem {
    static readonly type = '[ITEM] CREATE';
    constructor(public payload: FoodItemRequest) { }
  }

  export class UpdateItem {
    static readonly type = '[ITEM] UPDATE';
    constructor(public id: string, public payload: FoodItemRequest) { }
  }

  export class DeleteItem {
    static readonly type = '[ITEM] DELETE';
    constructor(public payload: string) { }
  }

}
