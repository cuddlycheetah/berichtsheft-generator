import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BerichtsheftPage } from './berichtsheft.page';

describe('BerichtsheftPage', () => {
  let component: BerichtsheftPage;
  let fixture: ComponentFixture<BerichtsheftPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BerichtsheftPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BerichtsheftPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
