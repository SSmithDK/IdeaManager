import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingIdeasComponent } from './voting-ideas.component';

describe('VotingIdeasComponent', () => {
  let component: VotingIdeasComponent;
  let fixture: ComponentFixture<VotingIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
