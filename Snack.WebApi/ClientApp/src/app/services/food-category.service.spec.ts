import { TestBed } from '@angular/core/testing';

import { FoodCategoryService } from './food-category.service';

describe('FoodCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodCategoryService = TestBed.get(FoodCategoryService);
    expect(service).toBeTruthy();
  });
});
