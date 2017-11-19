import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingReferenceIdeaComponent } from './adding-reference-idea.component';

describe('AddingReferenceIdeaComponent', () => {
  let component: AddingReferenceIdeaComponent;
  let fixture: ComponentFixture<AddingReferenceIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingReferenceIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingReferenceIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
