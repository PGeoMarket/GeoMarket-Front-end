import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFaq } from './submit-faq';

describe('SubmitFaq', () => {
  let component: SubmitFaq;
  let fixture: ComponentFixture<SubmitFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitFaq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitFaq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
