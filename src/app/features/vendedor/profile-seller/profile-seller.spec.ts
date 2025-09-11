import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSeller } from './profile-seller';

describe('ProfileSeller', () => {
  let component: ProfileSeller;
  let fixture: ComponentFixture<ProfileSeller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSeller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSeller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
