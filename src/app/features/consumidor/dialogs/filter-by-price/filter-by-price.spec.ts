import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByPrice } from './filter-by-price';

describe('FilterByPrice', () => {
  let component: FilterByPrice;
  let fixture: ComponentFixture<FilterByPrice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterByPrice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByPrice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
