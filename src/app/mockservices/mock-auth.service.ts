import { Injectable } from '@angular/core';

@Injectable()
export class MockAuthService {

  constructor() { }

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
