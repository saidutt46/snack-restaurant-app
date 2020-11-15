import { CustomTableFilterComponent } from './custom-table-filter/custom-table-filter.component';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { NOTIFICATION_SERV_TOKEN, INotificationService } from './../../services/notification.service';
import { ViewChild, Inject, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { BaseComponent } from './base.component';
import { SelectionChange } from '@angular/cdk/collections';
import { ILoggingService, LOGGING_SERV_TOKEN } from 'src/app/services/logging.service';

export abstract class BaseTableComponent<T> extends BaseComponent {
  dataSource$: Subject<T[]> = new BehaviorSubject<T[]>([]); // datatable source updated in other components that uses this class.
  @ViewChild(CustomTableComponent, { static: true }) dataTable: CustomTableComponent<T>; // access to table
  @ViewChild(CustomTableFilterComponent, { static: true }) filterInput: CustomTableFilterComponent; // access to filter.
  dataSourceAssigned = new EventEmitter<any>();
  protected selection$ = new Subject<T>();
  multiSelection$ = new Subject<T[]>();
  selectedRecord: T;
  showLoading = true;

  constructor(
    protected store: Store,
    @Inject(LOGGING_SERV_TOKEN) protected logger: ILoggingService,
    @Inject(NOTIFICATION_SERV_TOKEN) protected notifier: INotificationService
  ) {
    super(store, notifier, logger);
  }

  get dataSource() {
    return this.dataTable ? this.dataTable.dataSource : undefined;
  }

  // will be used in the future when table data is refreshed after insertion or deletion of data
  assignDataSourceOnRefresh(results: T[], doNotSelectFirstRecord?: boolean): void {
    this.dataSource$.next(results);
    if (!doNotSelectFirstRecord) {
        this.selectFirstRecordByDefault();
    }
    this.dataSourceAssigned.emit();
  }

  selectFirstRecordByDefault() {
    if (!this.selectedRecord &&
        this.dataSource &&
        this.dataTable.selection &&
        this.dataSource.data && this.dataSource.data.length > 0 &&
        ((this.filterInput && !this.filterInput.isFocused) || !this.filterInput)) {
        this.selectedRecord = this.dataSource.data[0];
        this.selection$.next(this.selectedRecord);
        this.dataTable.selection.select(this.selectedRecord);
    }
  }

  selectionChanged(evt: SelectionChange<T>) {
      const addedSelections = evt.added;
      if (addedSelections.length > 0) {
          this.selectedRecord = addedSelections[0];
          this.selection$.next(this.selectedRecord);
      } else {
          this.selectedRecord = undefined;
          this.selection$.next(undefined);
      }

      if (this.dataTable.supportMultiSelect) {
          this.multiSelection$.next(this.dataTable.selection.selected);
      }
  }
}
