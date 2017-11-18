import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MockAuthService {

  public isAuthorized = new Subject<boolean>();

  constructor() {
    this.isAuthorized.next(true);
   }

  login(email: string, password: string) {
    var defer;
    return defer.promise;
  }

  logout() {
    var defer;
    return defer.promise;
  }

  recoverPassword(email: string){
    var defer;
    return defer.promise;
  }

  createUser(email: string, password: string) {
    var defer;
    return defer.promise;
  }

}
