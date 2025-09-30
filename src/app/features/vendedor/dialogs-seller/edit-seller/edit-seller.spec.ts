import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeller } from './edit-seller';

describe('EditSeller', () => {
  let component: EditSeller;
  let fixture: ComponentFixture<EditSeller>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSeller]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSeller);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
