import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutzungsbedingungendialogComponent } from './nutzungsbedingungendialog.component';

describe('NutzungsbedingungendialogComponent', () => {
  let component: NutzungsbedingungendialogComponent;
  let fixture: ComponentFixture<NutzungsbedingungendialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutzungsbedingungendialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutzungsbedingungendialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
