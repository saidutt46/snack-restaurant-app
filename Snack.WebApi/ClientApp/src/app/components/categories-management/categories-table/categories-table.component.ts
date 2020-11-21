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

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.scss']
})
export class CategoriesTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  hasRecords: boolean;
  records: FoodCategoryModel[];
  categories: FoodCategoryModel[];
  displayedColumns: string[] = ['select', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<FoodCategoryModel>();
  selection = new SelectionModel<FoodCategoryModel>(true, []);
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
  ) { }

  ngOnInit() {
    this.categoriesList$.subscribe(res => {
      this.categories = res;
      this.hasRecords = res.length > 0 ? true : false;
      this.dataSource.data = this.categories;
      this.selection.clear();
    });
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
  checkboxLabel(row?: FoodCategoryModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showEdit(row: FoodCategoryModel) {
    // console.warn(row);
    this.categorySelected.emit(row);
  }

  deleteSelected() {
    this.refreshAndCloseEditPanel.emit();
    const selected = this.selection.selected;
    selected.forEach(category => {
      this.store.dispatch(new FoodCategoryActions.DeleteCategory(category.id));
    });
  }

  addCategory() {
    this.dialog.open(CategoriesAddComponent, {
      width: '30%'
    });
  }

  viewDetails(id: string) {
    this.router.navigate(['category', id]);
  }

}
