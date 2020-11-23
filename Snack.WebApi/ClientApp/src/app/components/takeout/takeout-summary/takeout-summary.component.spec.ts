import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeoutSummaryComponent } from './takeout-summary.component';

describe('TakeoutSummaryComponent', () => {
  let component: TakeoutSummaryComponent;
  let fixture: ComponentFixture<TakeoutSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeoutSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeoutSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
