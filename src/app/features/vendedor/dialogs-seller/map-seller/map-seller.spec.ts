import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSeller } from './map-seller';

describe('MapSeller', () => {
  let component: MapSeller;
  let fixture: ComponentFixture<MapSeller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSeller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapSeller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
