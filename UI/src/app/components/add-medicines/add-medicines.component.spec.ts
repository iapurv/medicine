import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicinesComponent } from './add-medicines.component';

describe('AddTutorialComponent', () => {
  let component: AddMedicinesComponent;
  let fixture: ComponentFixture<AddMedicinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedicinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
