import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePublications } from './favorite-publications';

describe('FavoritePublications', () => {
  let component: FavoritePublications;
  let fixture: ComponentFixture<FavoritePublications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritePublications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePublications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
