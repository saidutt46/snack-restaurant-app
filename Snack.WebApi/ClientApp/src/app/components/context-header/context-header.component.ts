import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-context-header',
  templateUrl: './context-header.component.html',
  styleUrls: ['./context-header.component.scss']
})
export class ContextHeaderComponent implements OnInit {
  @Input() title: string;

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  takemeBack() {
    this.location.back();
  }

}
