import { NOTIFICATION_SERV_TOKEN, INotificationService } from './../../../services/notification.service';
import { Component, OnInit, Input, ViewChild, ElementRef, Inject,
  AfterContentInit, AfterViewInit, Output, EventEmitter, ContentChild, ContentChildren,
  QueryList, Directive, forwardRef, Optional, Host, Self } from '@angular/core';
import { MatTableDataSource, MatSort, PageEvent, MatHeaderRowDef,
  MatFooterRowDef, MatColumnDef, MatRowDef, MatTable } from '@angular/material';
import { Store } from '@ngxs/store';
import { BaseComponent } from '../base.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { IPSColumn, IPSColumnDef, PSColumnDef } from '../table-model/column-def';
import { LOGGING_SERV_TOKEN, ConsoleLoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})

export class CustomTableComponent<T> extends BaseComponent implements OnInit, AfterViewInit, AfterContentInit {
  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  private dataSourceVal$: Observable<T[]>;
  private hasRecordsVal$ = new BehaviorSubject<boolean>(false);
  highlightRowIndex: number;
  dataSourceUpdated = false;
  selection: SelectionModel<T>;
  displayableColumns: IPSColumn[];

  @Input() name: string;
  @Input() displayedColumns: IPSColumn[];
  @Input() psColumnDefs: IPSColumn[] = [];
  @Input() supportSelect = true;
  @Input() supportSelectAll = false;
  @Input() supportMultiSelect = false;
  @Input() useDefaultMatRow = true;
  @Input() showLoading = false;
  @Input() multiTemplateDataRows = false;
  @Input() supportFilter = true;
  @Input() customRowClassFn: (data: any) => string;
  @Input() filterPredicate: (data: T, filter: string) => boolean;

  @Output() selectionChanged = new EventEmitter<SelectionChange<T>>();
  @Output() displayableColumnsChanged = new EventEmitter<IPSColumn[]>();
  @Output() rowClicked = new EventEmitter<T>();

  @ContentChild(MatHeaderRowDef, { static: true }) headerRowDef: MatHeaderRowDef;
  @ContentChild(MatFooterRowDef, { static: true }) footerRowDef: MatFooterRowDef;
  @ContentChildren(MatColumnDef) matColumnDefs: QueryList<MatColumnDef>;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  get displayedColumnNames() {
    return this.displayedColumns ? this.displayedColumns.map(x => x.name) : [];
  }

  get columnDefs(): IPSColumnDef<T>[] {
    return this.psColumnDefs.filter(x => x instanceof PSColumnDef)
        .map(x => x as IPSColumnDef<T>);
  }

  get filterVal(): string {
      return this.dataSource.filter;
  }

  get dataSource$(): Observable<T[]> {
      return this.dataSourceVal$;
  }

  @Input() set dataSource$(val$: Observable<T[]>) {
      if (val$ !== this.dataSourceVal$) {
          this.dataSourceVal$ = val$;
          if (this.dataSourceVal$) {
              this.dataSourceVal$.pipe(takeUntil(this.unSubscribe))
                  .subscribe(data => {
                      this.dataSourceUpdated = true;
                      this.dataSource.data = data ? data as T[] : [];
                      this.hasRecordsVal$.next(this.dataSource.data.length > 0);
                  });
          }
      }
  }

  get hasRecords$(): Observable<boolean> {
      return this.hasRecordsVal$;
  }

  constructor(
    protected store: Store,
    @Inject(LOGGING_SERV_TOKEN) protected logger: ConsoleLoggingService,
    @Inject(NOTIFICATION_SERV_TOKEN) protected notifier: INotificationService
  ) {
    super(store, notifier, logger);
    this.dataSource.filterPredicate =
            (data: T, filter: string) => {
                const filterTrimmed = filter.trim().toLowerCase();
                return this.defaultFilter(data, filterTrimmed) ||
                    this.dateFilter(data, filterTrimmed) ||
                    this.booleanTypeFilter(data, filterTrimmed);
            };

        this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
            const col = this.psColumnDefs.find(c => c.name === sortHeaderId);
            if (col && col.dataAccessor) {
                return col.dataAccessor(data, sortHeaderId);
            } else {
                const value: any = data[sortHeaderId];
                return typeof value === 'string' ? value.toLowerCase() : value;
            }
        };
   }

   defaultFilter(data, filter): boolean {
    let dataMatches = false;

    for (let ii = 0; ii < this.psColumnDefs.length && !dataMatches; ++ii) {
        const columnDef = this.psColumnDefs[ii];
        if (columnDef.getData) {
            const propData = columnDef.getData(data);
            dataMatches = propData !== undefined
                && propData !== null
                && (propData + '').toLowerCase().includes(filter);
        }
    }
    return dataMatches;
  }

  dateFilter(data, filter): boolean {
      let dataMatches = false;
      for (let ii = 0; ii < this.columnDefs.length && !dataMatches; ++ii) {
          const columnDef = this.columnDefs[ii];
          if (columnDef.transform && columnDef.transform.split(':')[0] === 'date') {
              const transformmedDate = columnDef.getData(data);
              dataMatches = transformmedDate && transformmedDate.includes(filter);
          }
      }
      return dataMatches;
  }

  booleanTypeFilter(data, filter) {
      let dataMatches = false;
      for (let ii = 0; ii < this.columnDefs.length && !dataMatches; ++ii) {
          const columnDef = this.columnDefs[ii];
          if (columnDef.transform && columnDef.transform === 'booleanType') {
              const boolValue = columnDef.getData(data) === true ? 'Yes' : 'No';
              dataMatches = boolValue.toLowerCase().includes(filter);
          }
      }
      return dataMatches;
  }


  ngOnInit() {
    if (this.supportSelect || this.supportMultiSelect) {
      this.selection = new SelectionModel<T>(this.supportMultiSelect, []);
      this.selection.changed.pipe(takeUntil(this.unSubscribe))
          .subscribe((evt: SelectionChange<T>) => {
              this.selectionChanged.emit(evt);
          });
  }
    if (this.filterPredicate) {
        this.dataSource.filterPredicate = this.filterPredicate;
    }
  }

  // after content has been loaded -> assign data defs to the MatTable.
  ngAfterContentInit() {
    // Register the normal column defs to the table
    this.matColumnDefs.forEach(columnDef => {
      this.table.addColumnDef(columnDef);
    });

    if (this.rowDefs && this.rowDefs.length > 0) {
        // Register any custom row definitions to the table
        this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    }

    // setup column list
    if (!this.displayableColumns || this.displayableColumns.length === 0) {
        this.logger.info('generating column list');
        this.displayableColumns = this.getColumnNames();
    }
    this.displayableColumnsChanged.emit(this.displayableColumns);

    // if using the default mat row definition, we will build the columns/display columns if they
    // haven't been provided.
    if (this.useDefaultMatRow) {
        this.setupDefaultRowDef();
    }

    if (this.headerRowDef) {
        // Register the header row definition.
        // tslint:disable-next-line: deprecation
        this.table.setHeaderRowDef(this.headerRowDef);
    }

    if (this.footerRowDef) {
        // Register the footer row definition.
        this.table.addFooterRowDef(this.footerRowDef);
    }
  }

  ngAfterViewInit() {
    // make header not tabable
    const headers: HTMLCollectionOf<Element> = document.getElementsByClassName('mat-sort-header-button');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < headers.length; i++) {
        const element = headers[i];
        (element as HTMLElement).tabIndex = -1;
    }
  }

  updateMatSort(sort: MatSort): void {
    if (sort && !this.dataSource.sort) {
        this.dataSource.sort = sort;
    }
  }

  private getColumnNames(): IPSColumn[] {
    const selectCol: IPSColumn[] = this.supportMultiSelect ? [{
        label: 'Selected',
        name: 'select'
    }] : [];

    const psColDefs = this.psColumnDefs.map(ps => {
        return {
            name: ps.name,
            label: ps.label
        };
    });

    // fall back to material columns if the DT wasn't provided column definition configuration
    const matColDefs = (psColDefs.length === 0) ?
        this.matColumnDefs.map(col => {
            return {
                name: col.name,
                label: col.name
            };
        }) : [];

    return [...selectCol, ...psColDefs, ...matColDefs];
  }

  private setupDefaultRowDef(): void {
      this.logger.info('using default mat-row-def');

      if (!this.displayedColumns || this.displayedColumns.length === 0) {
          this.logger.info('generating display column list');
          this.displayedColumns = [...this.displayableColumns];
      }
  }

  // TODO: When selection is being worked on.
  arrowUpEvent() {
    if (this.highlightRowIndex === undefined || this.highlightRowIndex - 1 < 0) {
        this.highlightRowIndex = this.dataSource.data.length - 1;
    } else {
        this.highlightRowIndex = this.highlightRowIndex - 1;
    }
  }

  arrowDownEvent() {
    if (this.highlightRowIndex === undefined || this.highlightRowIndex === this.dataSource.data.length - 1) {
        this.highlightRowIndex = 0;
    } else {
        this.highlightRowIndex = this.highlightRowIndex + 1;
    }
  }

  selectAll(event) {
    if (event.checked) {
        this.dataSource.data.forEach((x, index) => {
            if (x) {
                this.selection.select(this.dataSource.data[index]);
            }
        });
    } else {
        this.selection.clear();
    }
  }

  checkForRowClass(data: any, index: number): string {
    let classes = '';
    if (document.activeElement && document.activeElement.id && document.activeElement.id.indexOf('row-checkbox-') > -1) {
        const rowCheckboxId = 'row-checkbox-' + index + '-input';
        const documentActiveElementId = document.activeElement.id;
        if (rowCheckboxId === documentActiveElementId) {
            classes = 'highlightedRow';
        }
    }
    // this.highlightRowIndex === index ? classes = 'highlightedRow' : classes = '';

    if (this.customRowClassFn) {
        const customRowClass = this.customRowClassFn(data);
        classes += customRowClass;
    }

    if (this.selection && this.selection.selected.includes(data)) {
        if (this.supportMultiSelect) {
            classes += ' darkModeMultiSelectedRow';
        }
        classes += ' selectedRow';
    }

    return classes;
  }
}

// tslint:disable-next-line:max-classes-per-file
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: `[psSort]`,
  providers: [{
      provide: MatSort,
      useExisting: forwardRef(() => SortDirective)
  }]
})
export class SortDirective extends MatSort {
  constructor( @Optional() @Host() @Self() private dataTable: CustomTableComponent<any>) {
      super();
      // throw exception if dataTable not defined
      this.dataTable.updateMatSort(this);
  }
}
