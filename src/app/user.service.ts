import { Injectable } from '@angular/core';

import { User } from './user';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase
  ) { }

  public getCurrentUser(): Observable<User> {
    if( this.isAuthenticated() )
    {
      return this.afDb.object<User>(`Users/${this.getUserId()}`).snapshotChanges().map(action => {
        const id = action.payload.key;
        const data = { id, ...action.payload.val() };
        data.Email = this.afAuth.auth.currentUser.uid;
        return data;
      }).do((user) => {
        this.afDb.object<any>(`Approved/${this.getUserId()}`).valueChanges().subscribe((approved) => user.approved = approved.Approved);
        this.afDb.object<any>(`Managers/${this.getUserId()}`).valueChanges().subscribe(
          (manager) => {
            user.manager = manager != null
          },
          error => {
            user.manager = false;
            console.log("Permission problem");
          });
      });
    }
    else
    {
      return null;
    }
  }

  public getUserId(): string {
    return this.isAuthenticated() !== null ? this.afAuth.auth.currentUser.uid : "";
  }

  public isAuthenticated(): boolean {
    return this.afAuth.auth.currentUser !== null;
  }

  public getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

}
