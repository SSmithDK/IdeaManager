import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';
import { IdeaComponent } from '../idea/idea.component';
import { VotingIdeasComponent } from '../voting-ideas/voting-ideas.component';
import {MockUserService} from "../mockservices/mock-user.service";
import {UserService} from "../services/user.service";
import { AddingReferenceIdeaComponent } from '../adding-reference-idea/adding-reference-idea.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ DashboardComponent, IdeaComponent, VotingIdeasComponent, AddingReferenceIdeaComponent ],
      providers: [
        {provide: IdeaService, useClass: MockIdeaService},
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
