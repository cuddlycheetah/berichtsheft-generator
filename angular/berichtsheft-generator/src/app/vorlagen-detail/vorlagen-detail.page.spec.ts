import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VorlagenDetailPage } from './vorlagen-detail.page';

describe('VorlagenDetailPage', () => {
  let component: VorlagenDetailPage;
  let fixture: ComponentFixture<VorlagenDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VorlagenDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VorlagenDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
