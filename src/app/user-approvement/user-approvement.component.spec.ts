import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApprovementComponent } from './user-approvement.component';

describe('UserApprovementComponent', () => {
  let component: UserApprovementComponent;
  let fixture: ComponentFixture<UserApprovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserApprovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserApprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
