import { PSCustomColumnDef } from './../../shared-components/table-model/column-def';
import { CustomTableComponent } from './../../shared-components/custom-table/custom-table.component';
import { Router } from '@angular/router';
import { CategoriesAddComponent } from './../categories-add/categories-add.component';
import { FoodCategoryActions } from 'src/app/ngxs-store/food-category/food-category.action';
import { FoodCategoryModel } from './../../../models/food-category.model';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NOTIFICATION_SERV_TOKEN, INotificationService } from 'src/app/services';
import { LOGGING_SERV_TOKEN, ConsoleLoggingService } from 'src/app/services/logging.service';
import { Observable } from 'rxjs';
import { FoodCategorySelector } from 'src/app/ngxs-store/food-category/food-category.selector';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { BaseTableComponent } from '../../shared-components/base-table.component';
import { IPSColumn, PSColumnDef } from '../../shared-components/table-model/column-def';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent extends BaseTableComponent<FoodCategoryModel> {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  showLoading: boolean;
  hasRecords: boolean;
  @ViewChild('dt', { static: true }) dataTableComponent: CustomTableComponent<FoodCategoryModel>;
  readonly psColumnDefs: IPSColumn[];

  // records: FoodCategoryModel[];
  // categories: FoodCategoryModel[];
  // selection = new SelectionModel<FoodCategoryModel>(true, []);
  @Select(FoodCategorySelector.getPageLoading) loading$: Observable<boolean>;
  @Select(FoodCategorySelector.getAllCategories) categoriesList$: Observable<FoodCategoryModel[]>;

  @Output() categorySelected: EventEmitter<FoodCategoryModel> = new EventEmitter<FoodCategoryModel>(undefined);
  @Output() refreshAndCloseEditPanel: EventEmitter<any> = new EventEmitter<any>(undefined);

  constructor(
    protected store: Store,
    @Inject(LOGGING_SERV_TOKEN) protected logger: ConsoleLoggingService,
    @Inject(NOTIFICATION_SERV_TOKEN) protected notifier: INotificationService,
    private dialog: MatDialog,
    private router: Router
  ) {
    super(store, logger, notifier);
    this.psColumnDefs = [
      PSColumnDef.create('name', 'Category Name'),
      PSColumnDef.create('description', 'Description'),
      PSCustomColumnDef.create('actions', 'Actions')
    ];
   }

  recordSelected(row: FoodCategoryModel) {
    this.categorySelected.emit(row);
  }

  // deleteSelected() {
  //   this.refreshAndCloseEditPanel.emit();
  //   const selected = this.selection.selected;
  //   selected.forEach(category => {
  //     this.store.dispatch(new FoodCategoryActions.DeleteCategory(category.id));
  //   });
  // }

  addCategory() {
    this.dialog.open(CategoriesAddComponent, {
      width: '30%'
    });
  }

  viewDetails(id: string) {
    this.router.navigate(['category', id]);
  }

}
