import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePublication } from './rate-publication';

describe('RatePublication', () => {
  let component: RatePublication;
  let fixture: ComponentFixture<RatePublication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatePublication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatePublication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
