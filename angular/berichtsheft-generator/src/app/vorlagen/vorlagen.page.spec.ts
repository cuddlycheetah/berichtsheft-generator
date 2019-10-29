import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VorlagenPage } from './vorlagen.page';

describe('VorlagenPage', () => {
  let component: VorlagenPage;
  let fixture: ComponentFixture<VorlagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VorlagenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VorlagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
