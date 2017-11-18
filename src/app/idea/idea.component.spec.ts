import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaComponent } from './idea.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VotingIdeasComponent } from '../voting-ideas/voting-ideas.component';

describe('IdeaComponent', () => {
  let component: IdeaComponent;
  let fixture: ComponentFixture<IdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ IdeaComponent, VotingIdeasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
