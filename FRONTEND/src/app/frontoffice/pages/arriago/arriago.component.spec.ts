import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriagoComponent } from './arriago.component';

describe('ArriagoComponent', () => {
  let component: ArriagoComponent;
  let fixture: ComponentFixture<ArriagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArriagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArriagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
