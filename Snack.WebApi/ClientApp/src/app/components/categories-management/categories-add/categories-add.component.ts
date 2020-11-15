import { Observable } from 'rxjs';
import { FoodCategorySelector } from './../../../ngxs-store/food-category/food-category.selector';
import { MatDialog } from '@angular/material';
import { FoodCategoryActions } from 'src/app/ngxs-store/food-category/food-category.action';
import { FoodCategoryCreateRequest } from './../../../models/food-category.model';
import { Select, Store } from '@ngxs/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-add',
  templateUrl: './categories-add.component.html',
  styleUrls: ['./categories-add.component.scss']
})
export class CategoriesAddComponent implements OnInit {
  @Select(FoodCategorySelector.getFormLoading) loading$: Observable<boolean>;
  addForm: FormGroup;
  loading: boolean;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loading = true;
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
    this.loading = false;
  }

  saveCategory() {
    const model = new FoodCategoryCreateRequest();
    model.name = this.addForm.get('name').value;
    model.description = this.addForm.get('description').value;
    this.store.dispatch(new FoodCategoryActions.CreateCategory(model)).subscribe(() => {
      this.dialog.closeAll();
    });
  }

}
