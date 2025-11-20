import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedPublication } from './reported-publication';

describe('ReportedPublication', () => {
  let component: ReportedPublication;
  let fixture: ComponentFixture<ReportedPublication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedPublication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedPublication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
