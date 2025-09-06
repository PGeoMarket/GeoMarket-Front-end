import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSlidebar } from './seller-slidebar';

describe('SellerSlidebar', () => {
  let component: SellerSlidebar;
  let fixture: ComponentFixture<SellerSlidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerSlidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerSlidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
