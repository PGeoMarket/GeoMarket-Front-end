import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenReporte } from './open-reporte';

describe('OpenReporte', () => {
  let component: OpenReporte;
  let fixture: ComponentFixture<OpenReporte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenReporte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenReporte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
