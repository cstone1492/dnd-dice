import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDiceRollerComponent } from './multi-dice-roller.component';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';

describe('MultiDiceRollerComponent', () => {
  let component: MultiDiceRollerComponent;
  let fixture: ComponentFixture<MultiDiceRollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiDiceRollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDiceRollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
