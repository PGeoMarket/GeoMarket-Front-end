import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSlidebar } from './guest-slidebar';

describe('Guest', () => {
  let component: GuestSlidebar;
  let fixture: ComponentFixture<GuestSlidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestSlidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestSlidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
