import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DieSetsComponent } from './die-sets.component';

describe('DieSetsComponent', () => {
  let component: DieSetsComponent;
  let fixture: ComponentFixture<DieSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DieSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DieSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
