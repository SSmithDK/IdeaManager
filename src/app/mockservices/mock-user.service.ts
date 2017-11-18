import { Injectable } from '@angular/core';
import { User } from '../user';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MockUserService {

  private user = new User;
  public currentUser = new BehaviorSubject<User>(this.user);

  constructor( ) {
    this.user = new User;
    this.user.id = "testid";
    this.user.Name = "Test user";
    this.user.Email = "test@email.com";
    this.user.Approved = false;
    this.user.Manager = false;
    this.currentUser.next(this.user);
   }

  public updateName(uid: string, name: string) {
    // Do nothing, act like name is updated
  }

  public createUser(uid: string, name: string, email: string) {
    // Do nothing, act like user is created
  }

  public deleteUser(uid: string, onComplete?: (a: Error | null) => any) {
    // Do nothing, act like user is deleted
  }

  public approveUser(uid: string, onComplete?: (a: Error | null) => any) {
    // Do nothing, act like user is approved
  }

  public getPendingUsers(): Observable<User[]> {
    var user = new User;
    user.id = "testid";
    user.Name = "Test user";
    user.Email = "test@email.com";
    user.Approved = false;
    user.Manager = false;
    return of([user]);
  }

  public isManager(uid: string) {
    return true;
  }

}
