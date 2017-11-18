import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingIdeasComponent } from './voting-ideas.component';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';

describe('VotingIdeasComponent', () => {
  let component: VotingIdeasComponent;
  let fixture: ComponentFixture<VotingIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingIdeasComponent ],
      providers: [
        {provide: IdeaService, useClass: MockIdeaService}
      ]
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
