import { FoodCategorySelector } from 'src/app/ngxs-store/food-category/food-category.selector';
import { FoodCategoryModel } from './../../../models/food-category.model';
import { FoodItemSelector } from './../../../ngxs-store/food-items/food-item.selector';
import { FoodItemActions } from 'src/app/ngxs-store/food-items/food-item.action';
import { FoodItemRequest, FoodItemModel } from './../../../models/food-item.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items-edit',
  templateUrl: './items-edit.component.html',
  styleUrls: ['./items-edit.component.scss']
})
export class ItemsEditComponent implements OnInit {
  @Select(FoodItemSelector.getFormLoading) loading$: Observable<boolean>;
  @Select(FoodCategorySelector.getAllCategories) categoriesList$: Observable<FoodCategoryModel[]>;
  item: FoodItemModel;
  editForm: FormGroup;
  categories: FoodCategoryModel[];
  @Output() closePanel: EventEmitter<any> = new EventEmitter<any>();

  get currentItem() {
    return this.item;
  }

  @Input() set currentItem(val: FoodItemModel) {
    if (this.item !== val) {
      this.item = val;
      this.createForm(val);
    }
  }
  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit() {
    this.categoriesList$.subscribe(res => {
      this.categories = res;
    });
  }

  createForm(item: FoodItemModel) {
    this.editForm = this.fb.group({
      name: [item.name, [Validators.required]],
      description: [item.description],
      unitPrice: [item.unitPrice, [Validators.required]],
      foodCategoryId: [item.foodCategoryId, [Validators.required]],
      availability: new FormControl(item.availability),
      calories: [item.calories]
    });
  }

  closeEdit() {
    this.closePanel.emit();
  }

  saveItem() {
    const model = new FoodItemRequest();
    model.name = this.editForm.get('name').value;
    model.description = this.editForm.get('description').value;
    model.unitPrice = this.editForm.get('unitPrice').value;
    model.calories = this.editForm.get('calories').value;
    model.foodCategoryId = this.editForm.get('foodCategoryId').value;
    model.availability = this.editForm.get('availability').value;
    console.warn(model);
    this.store.dispatch(new FoodItemActions.UpdateItem(this.item.id, model)).subscribe(() => {
      this.closePanel.emit();
    });
  }

}
