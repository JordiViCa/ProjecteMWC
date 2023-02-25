import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOfficeLayoutComponent } from './client-office-layout.component';

describe('ClientOfficeLayoutComponent', () => {
  let component: ClientOfficeLayoutComponent;
  let fixture: ComponentFixture<ClientOfficeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientOfficeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOfficeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
