import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByCategory } from './filter-by-category';

describe('FilterByCategory', () => {
  let component: FilterByCategory;
  let fixture: ComponentFixture<FilterByCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterByCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
