import { Component, OnInit, Input, HostListener } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-custom-table-filter',
  templateUrl: './custom-table-filter.component.html',
  styleUrls: ['./custom-table-filter.component.scss']
})
export class CustomTableFilterComponent implements OnInit {
  isFocused = false;
  // datatable component to apply the filter to
  @Input() tableDataSource: MatTableDataSource<any>;
  @Input() placeholder: string;
  // filter value used to prepopulate the filter field if a filter is currently applied to the datatable
  filterVal = '';

  constructor() {}

  @HostListener('window:keydown', ['$event'])
  keyupEvent(event: KeyboardEvent) {
    setTimeout(() => {
      const searchField = document.getElementById('filter');
      if (searchField) {
          searchField.focus();
      }
  }, 500);
  }

  ngOnInit() {
      this.filterVal = this.tableDataSource ? this.tableDataSource.filter : '';
  }

  applyFilter(filter: string): void {
      this.tableDataSource.filter = filter;
  }
}

