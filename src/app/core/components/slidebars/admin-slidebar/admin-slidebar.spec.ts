import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSlidebar } from './admin-slidebar';

describe('Admin', () => {
  let component: AdminSlidebar;
  let fixture: ComponentFixture<AdminSlidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSlidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSlidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
