import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsumer } from './edit-consumer';

describe('EditConsumer', () => {
  let component: EditConsumer;
  let fixture: ComponentFixture<EditConsumer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConsumer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConsumer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
