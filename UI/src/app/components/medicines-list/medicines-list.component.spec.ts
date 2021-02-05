import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesListComponent } from './medicines-list.component';

describe('TutorialsListComponent', () => {
  let component: MedicinesListComponent;
  let fixture: ComponentFixture<MedicinesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicinesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
