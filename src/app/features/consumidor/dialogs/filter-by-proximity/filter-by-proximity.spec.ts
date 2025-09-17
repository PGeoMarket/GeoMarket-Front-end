import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByProximity } from './filter-by-proximity';

describe('FilterByProximity', () => {
  let component: FilterByProximity;
  let fixture: ComponentFixture<FilterByProximity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterByProximity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterByProximity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
