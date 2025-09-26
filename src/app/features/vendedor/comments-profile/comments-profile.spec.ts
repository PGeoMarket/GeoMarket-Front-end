import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsProfile } from './comments-profile';

describe('CommentsProfile', () => {
  let component: CommentsProfile;
  let fixture: ComponentFixture<CommentsProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
