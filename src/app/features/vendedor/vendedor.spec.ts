import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vendedor } from './vendedor';

describe('Vendedor', () => {
  let component: Vendedor;
  let fixture: ComponentFixture<Vendedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vendedor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vendedor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
