import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublication } from './edit-publication';

describe('EditPublication', () => {
  let component: EditPublication;
  let fixture: ComponentFixture<EditPublication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPublication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPublication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
