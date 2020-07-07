import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiSquareFormComponent } from './chi-square-form.component';

describe('ChiSquareFormComponent', () => {
  let component: ChiSquareFormComponent;
  let fixture: ComponentFixture<ChiSquareFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiSquareFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiSquareFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
