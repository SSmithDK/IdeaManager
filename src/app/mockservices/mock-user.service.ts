import { Injectable } from '@angular/core';
import { User } from '../user';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MockUserService {

  public currentUser = new Subject<User>();

  constructor( ) {
    var user = new User;
    user.id = "testid";
    user.Name = "Test user";
    user.Email = "test@email.com";
    user.Approved = false;
    user.Manager = false;
    this.currentUser.next(user);
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
