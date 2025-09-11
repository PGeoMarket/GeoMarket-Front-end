import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileConsumer } from './profile-consumer';

describe('ProfileConsumer', () => {
  let component: ProfileConsumer;
  let fixture: ComponentFixture<ProfileConsumer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileConsumer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileConsumer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
