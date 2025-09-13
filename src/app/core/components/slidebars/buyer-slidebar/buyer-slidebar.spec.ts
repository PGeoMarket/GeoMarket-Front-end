import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSlidebar } from './buyer-slidebar';

describe('Buyer', () => {
  let component: BuyerSlidebar;
  let fixture: ComponentFixture<BuyerSlidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerSlidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerSlidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
