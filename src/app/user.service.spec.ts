import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserService, AngularFireAuth, FirebaseApp ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
