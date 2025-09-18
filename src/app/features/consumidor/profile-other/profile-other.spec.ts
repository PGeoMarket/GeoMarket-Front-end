import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOther } from './profile-other';

describe('ProfileOther', () => {
  let component: ProfileOther;
  let fixture: ComponentFixture<ProfileOther>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileOther]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileOther);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
