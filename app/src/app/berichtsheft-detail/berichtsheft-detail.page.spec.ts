import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BerichtsheftDetailPage } from './berichtsheft-detail.page';

describe('BerichtsheftDetailPage', () => {
  let component: BerichtsheftDetailPage;
  let fixture: ComponentFixture<BerichtsheftDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BerichtsheftDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BerichtsheftDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
