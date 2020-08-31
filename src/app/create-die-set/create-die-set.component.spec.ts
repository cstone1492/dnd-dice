import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDieSetComponent } from './create-die-set.component';

describe('CreateDieSetComponent', () => {
  let component: CreateDieSetComponent;
  let fixture: ComponentFixture<CreateDieSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDieSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDieSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
