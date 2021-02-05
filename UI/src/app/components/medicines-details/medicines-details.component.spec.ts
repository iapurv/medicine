import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesDetailsComponent } from './medicines-details.component';

describe('TutorialDetailsComponent', () => {
  let component: MedicinesDetailsComponent;
  let fixture: ComponentFixture<MedicinesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
