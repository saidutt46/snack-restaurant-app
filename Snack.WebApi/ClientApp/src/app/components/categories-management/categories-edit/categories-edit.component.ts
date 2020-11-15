import { Observable } from 'rxjs';
import { FoodCategoryActions } from 'src/app/ngxs-store/food-category/food-category.action';
import { FoodCategorySelector } from './../../../ngxs-store/food-category/food-category.selector';
import { Select, Store } from '@ngxs/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FoodCategoryModel, FoodCategoryCreateRequest } from './../../../models/food-category.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.scss']
})
export class CategoriesEditComponent implements OnInit {
  @Select(FoodCategorySelector.getFormLoading) loading$: Observable<boolean>;
  category: FoodCategoryModel;
  editForm: FormGroup;
  @Output() closePanel: EventEmitter<any> = new EventEmitter<any>();

  get currentCategory() {
    return this.category;
  }

  @Input() set currentCategory(val: FoodCategoryModel) {
    if (this.category !== val) {
      this.category = val;
      this.createForm(val);
    }
  }

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) { }

  ngOnInit() {
  }

  createForm(category: FoodCategoryModel) {
    this.editForm = this.fb.group({
      name: [category.name, [Validators.required]],
      description: [category.description]
    });
  }

  closeEdit() {
    this.closePanel.emit();
  }

  saveCategory() {
    const model = new FoodCategoryCreateRequest();
    model.name = this.editForm.get('name').value;
    model.description = this.editForm.get('description').value;
    this.store.dispatch(new FoodCategoryActions.UpdateCategory(this.category.id, model)).subscribe(() => {
      this.closePanel.emit();
    });
  }

}
