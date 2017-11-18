import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIdeasComponent } from './my-ideas.component';
import { IdeaComponent } from '../idea/idea.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';
import { IdeaService } from '../services/idea.service';
import { MockIdeaService } from '../mockservices/mock-idea.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyIdeasComponent', () => {
  let component: MyIdeasComponent;
  let fixture: ComponentFixture<MyIdeasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        MyIdeasComponent, 
        IdeaComponent
      ],
      providers: [
        {provide: UserService, useClass: MockUserService},
        {provide: IdeaService, useClass: MockIdeaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
