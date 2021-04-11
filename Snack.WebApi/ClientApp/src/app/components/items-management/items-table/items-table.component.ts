import { FoodCategorySelector } from './../../../ngxs-store/food-category/food-category.selector';
import { PSCustomColumnDef } from './../../shared-components/table-model/column-def';

import { FoodItemActions } from 'src/app/ngxs-store/food-items/food-item.action';
import { FoodItemModel } from './../../../models/food-item.model';
import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, Inject, Input } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { INotificationService, NOTIFICATION_SERV_TOKEN } from 'src/app/services/notification.service';
import { ConsoleLoggingService, LOGGING_SERV_TOKEN } from 'src/app/services/logging.service';
import { FoodItemSelector } from 'src/app/ngxs-store/food-items/food-item.selector';
import { ItemsAddComponent } from '../items-add/items-add.component';
import { BaseTableComponent } from '../../shared-components/base-table.component';
import { IPSColumn, PSColumnDef } from '../../shared-components/table-model/column-def';
import { CustomTableComponent } from '../../shared-components/custom-table/custom-table.component';

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent extends BaseTableComponent<FoodItemModel> {
  showLoading: boolean;
  hasRecords: boolean;
  @ViewChild('dt', { static: true }) dataTableComponent: CustomTableComponent<FoodItemModel>;
  readonly psColumnDefs: IPSColumn[];
  @Select(FoodItemSelector.getPageLoading) loading$: Observable<boolean>;
  @Select(FoodItemSelector.getAllItems) itemList$: Observable<FoodItemModel[]>;
  @Select(FoodCategorySelector.getFoodItems) itemsByCategory$: Observable<FoodItemModel[]>;

  @Output() itemSelected: EventEmitter<FoodItemModel> = new EventEmitter<FoodItemModel>(undefined);
  @Output() refreshAndCloseEditPanel: EventEmitter<any> = new EventEmitter<any>(undefined);

  constructor(
    protected store: Store,
    @Inject(LOGGING_SERV_TOKEN) protected logger: ConsoleLoggingService,
    @Inject(NOTIFICATION_SERV_TOKEN) protected notifier: INotificationService,
    private dialog: MatDialog
  ) {
    super(store, logger, notifier);
    this.psColumnDefs = [
      PSColumnDef.create('name', 'Category Name'),
      PSCustomColumnDef.create('unitPrice', 'Unit Price ($)'),
      PSColumnDef.create('calories', 'Calories'),
      PSCustomColumnDef.create('availability', 'Availability', undefined, undefined,
      (x: FoodItemModel) => this.getAvailabilityValue(x.availability)),
      PSCustomColumnDef.create('actions', 'Actions')
    ];
   }

   recordSelected(row: FoodItemModel) {
    this.itemSelected.emit(row);
  }

  // deleteSelected() {
  //   this.refreshAndCloseEditPanel.emit();
  //   const selected = this.selection.selected;
  //   selected.forEach(category => {
  //     this.store.dispatch(new FoodItemActions.DeleteItem(category.id));
  //   });
  // }

  getAvailabilityValue(val: boolean): string {
    return val === true  ? 'check_circle' : 'block';
  }

  addItem() {
    this.dialog.open(ItemsAddComponent, {
      width: '30%'
    });
  }

}
