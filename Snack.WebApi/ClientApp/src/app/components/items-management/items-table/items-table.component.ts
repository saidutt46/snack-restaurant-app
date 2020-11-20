
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

@Component({
  selector: 'app-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  hasRecords: boolean;
  items: FoodItemModel[];
  displayedColumns: string[] = ['select', 'name', 'description', 'unitPrice', 'calories', 'availability',  'actions'];
  dataSource = new MatTableDataSource<FoodItemModel>();
  selection = new SelectionModel<FoodItemModel>(true, []);
  records: FoodItemModel[];
  @Select(FoodItemSelector.getPageLoading) loading$: Observable<boolean>;
  @Output() itemSelected: EventEmitter<FoodItemModel> = new EventEmitter<FoodItemModel>(undefined);
  @Output() refreshAndCloseEditPanel: EventEmitter<any> = new EventEmitter<any>(undefined);

  get source() {
    return this.records;
  }

  @Input() set source(val: FoodItemModel[]) {
    if (this.records !== val) {
      this.records = val;
      this.hasRecords = val.length > 0 ? true : false;
      this.items = val;
      this.dataSource.data = this.items;
      this.selection.clear();
    }
  }

  constructor(
    protected store: Store,
    @Inject(LOGGING_SERV_TOKEN) protected logger: ConsoleLoggingService,
    @Inject(NOTIFICATION_SERV_TOKEN) protected notifier: INotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.logger.log('food items component init');
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: FoodItemModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showEdit(row: FoodItemModel) {
    // console.warn(row);
    this.itemSelected.emit(row);
  }

  deleteSelected() {
    this.refreshAndCloseEditPanel.emit();
    const selected = this.selection.selected;
    selected.forEach(category => {
      this.store.dispatch(new FoodItemActions.DeleteItem(category.id));
    });
  }

  getAvailabilityValue(val: boolean): string {
    return val  ? 'check_circle' : 'block';
  }

  addItem() {
    this.dialog.open(ItemsAddComponent, {
      width: '30%'
    });
  }

}
