import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAs } from './register-as';

describe('RegisterAs', () => {
  let component: RegisterAs;
  let fixture: ComponentFixture<RegisterAs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
