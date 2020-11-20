export class FoodItemModel {
  id: string;
  name: string;
  description: string;
  availability: boolean;
  calories: number;
  unitPrice: number;
  foodCategoryId: string;
}

export class FoodItemRequest {
  name: string;
  description: string;
  availability: boolean;
  calories: number;
  unitPrice: number;
  foodCategoryId: string;
}
