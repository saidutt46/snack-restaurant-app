import { TestBed } from '@angular/core/testing';

import { FoodItemService } from './food-item.service';

describe('FoodItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodItemService = TestBed.get(FoodItemService);
    expect(service).toBeTruthy();
  });
});
