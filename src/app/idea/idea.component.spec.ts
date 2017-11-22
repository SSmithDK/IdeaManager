import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaComponent } from './idea.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VotingIdeasComponent } from '../voting-ideas/voting-ideas.component';
import { AddingReferenceIdeaComponent } from '../adding-reference-idea/adding-reference-idea.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';

describe('IdeaComponent', () => {
  let component: IdeaComponent;
  let fixture: ComponentFixture<IdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ IdeaComponent, VotingIdeasComponent, AddingReferenceIdeaComponent ],
      providers: [
        {provide: UserService, useClass: MockUserService}
      ]
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
