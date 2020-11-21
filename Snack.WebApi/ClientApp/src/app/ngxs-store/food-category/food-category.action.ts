import { FoodCategoryCreateRequest } from './../../models/food-category.model';
export namespace FoodCategoryActions {

  export class ListAllCategories {
    static readonly type = '[CATEGORY] GET ALL';
  }

  export class GetCategoryById {
    static readonly type = '[CATEGORY] GET INDIVIDUAL';
    constructor(public payload: string) { }
  }

  export class CreateCategory {
    static readonly type = '[CATEGORY] CREATE';
    constructor(public payload: FoodCategoryCreateRequest) { }
  }

  export class UpdateCategory {
    static readonly type = '[CATEGORY] UPDATE';
    constructor(
      public id: string,
      public payload: FoodCategoryCreateRequest,
      ) { }
  }

  export class DeleteCategory {
    static readonly type = '[CATEGORY] DELETE';
    constructor(public payload: string) { }
  }

  export class GetFoodItemsByCategoryId {
    static readonly type = '[CATEGORY] ITEMS';
    constructor(public payload: string) { }
  }
}
