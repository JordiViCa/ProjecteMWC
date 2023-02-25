import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontofficelayoutComponent } from './frontofficelayout.component';

describe('FrontofficelayoutComponent', () => {
  let component: FrontofficelayoutComponent;
  let fixture: ComponentFixture<FrontofficelayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontofficelayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontofficelayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
