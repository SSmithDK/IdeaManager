import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaDetailsComponent } from './idea-details.component';
import { FormsModule } from '@angular/forms';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';
import { CommentService } from '../services/comment.service';
import { MockCommentService } from '../mockservices/mock-comment.service';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../mockservices/mock-auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('IdeaDetailsComponent', () => {
  let component: IdeaDetailsComponent;
  let fixture: ComponentFixture<IdeaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ IdeaDetailsComponent ],
      providers: [
        {provide: IdeaService, useClass: MockIdeaService},
        {provide: CommentService, useClass: MockCommentService},
        {provide: AuthService, useClass: MockAuthService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
