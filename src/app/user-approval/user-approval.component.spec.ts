import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApprovalComponent } from './user-approval.component';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mockservices/mock-user.service';

describe('UserApprovalComponent', () => {
  let component: UserApprovalComponent;
  let fixture: ComponentFixture<UserApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserApprovalComponent ],
      providers: [
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
