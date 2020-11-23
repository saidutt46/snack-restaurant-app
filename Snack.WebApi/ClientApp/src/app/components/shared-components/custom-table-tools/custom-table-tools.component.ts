import { CustomTableFilterComponent } from './../custom-table-filter/custom-table-filter.component';
import { CustomTableComponent } from './../custom-table/custom-table.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-table-tools',
  templateUrl: './custom-table-tools.component.html',
  styleUrls: ['./custom-table-tools.component.scss']
})
export class CustomTableToolsComponent implements OnInit {
  @Input() dataTable: CustomTableComponent<any>;
  @Output() refreshAll = new EventEmitter<any>();
  @ViewChild(CustomTableFilterComponent, { static: true }) filterComp: CustomTableFilterComponent;

  constructor() { }

  ngOnInit() {
    console.log(this.dataTable);
  }

  get dataSource() {
      return this.dataTable ? this.dataTable.dataSource : undefined;
  }

  refresh() {
      this.refreshAll.emit();
  }

}
