import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTableToolsComponent } from './custom-table-tools.component';

describe('CustomTableToolsComponent', () => {
  let component: CustomTableToolsComponent;
  let fixture: ComponentFixture<CustomTableToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTableToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
