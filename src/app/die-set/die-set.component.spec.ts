import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieSetComponent } from './die-set.component';

describe('DieSetComponent', () => {
  let component: DieSetComponent;
  let fixture: ComponentFixture<DieSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
