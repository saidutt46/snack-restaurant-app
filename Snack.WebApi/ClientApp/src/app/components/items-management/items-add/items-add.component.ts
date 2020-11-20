import { FoodItemSelector } from './../../../ngxs-store/food-items/food-item.selector';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { FoodItemActions } from 'src/app/ngxs-store/food-items/food-item.action';
import { FoodItemRequest } from 'src/app/models/food-item.model';
import { FoodCategoryModel } from 'src/app/models/food-category.model';
import { FoodCategorySelector } from 'src/app/ngxs-store/food-category/food-category.selector';

@Component({
  selector: 'app-items-add',
  templateUrl: './items-add.component.html',
  styleUrls: ['./items-add.component.scss']
})
export class ItemsAddComponent implements OnInit {
  @Select(FoodItemSelector.getFormLoading) loading$: Observable<boolean>;
  @Select(FoodCategorySelector.getAllCategories) categoriesList$: Observable<FoodCategoryModel[]>;
  addForm: FormGroup;
  loading: boolean;
  categories: FoodCategoryModel[];

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.categoriesList$.subscribe(res => {
      this.categories = res;
    });
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      unitPrice: ['', [Validators.required]],
      foodCategoryId: ['', [Validators.required]],
      availability: new FormControl(true),
      calories: ['']
    });
  }

  saveCategory() {
    const model = new FoodItemRequest();
    model.name = this.addForm.get('name').value;
    model.description = this.addForm.get('description').value;
    model.unitPrice = this.addForm.get('unitPrice').value;
    const calories = this.addForm.get('calories').value;
    model.calories = calories > 0 ? calories : 0;
    model.foodCategoryId = this.addForm.get('foodCategoryId').value;
    model.availability = this.addForm.get('availability').value;
    console.warn(model);
    this.store.dispatch(new FoodItemActions.CreateItem(model)).subscribe(() => {
      this.dialog.closeAll();
    });
  }

}
