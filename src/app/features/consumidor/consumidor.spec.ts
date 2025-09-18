import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Consumidor } from './consumidor';

describe('Consumidor', () => {
  let component: Consumidor;
  let fixture: ComponentFixture<Consumidor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consumidor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Consumidor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
