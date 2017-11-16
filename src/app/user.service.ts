import { Injectable } from '@angular/core';

import { User } from './user';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { error } from 'selenium-webdriver';

@Injectable()
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) { }

  public updateName(uid: string, name: string) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: ''
    });
    this.afDb.database.ref(`Users/${uid}`).set({
      Name: name
    });
  }

}
