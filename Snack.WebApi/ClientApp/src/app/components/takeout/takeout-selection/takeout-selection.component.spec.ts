import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeoutSelectionComponent } from './takeout-selection.component';

describe('TakeoutSelectionComponent', () => {
  let component: TakeoutSelectionComponent;
  let fixture: ComponentFixture<TakeoutSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeoutSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeoutSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
