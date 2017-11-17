import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { User } from '../user';

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

  public createUser(uid: string, name: string, email: string) {
    this.afDb.database.ref(`Users/${uid}`).set({
      Name: name,
      Approved: false,
      Email: email
    });
  }

  public deleteUser(uid: string, onComplete?: (a: Error | null) => any) {

    this.afDb.database.ref(`Users/${uid}`).remove((error) => {

      onComplete(error);

    });
  }

  public approveUser(uid: string, onComplete?: (a: Error | null) => any) {

    this.afDb.database.ref(`Users/${uid}/Approved`).set(true, (error) => {

      onComplete(error);

    });
  }

  public getPendingUsers(): Observable<User[]> {
    return this.afDb.list('Users/', ref => ref.orderByChild('Approved').equalTo(false))
      .snapshotChanges().map((arr) => {
        return arr.map((item) => {
          var user = new User;
          user.id = item.key;
          user.Name = item.payload.val().Name;
          user.Email = item.payload.val().Email;
          user.Approved = item.payload.val().Approved;
          return user;
        });
      });
  }

  public isManager(uid: string) {
    return this.afDb.database.ref(`Managers/`).child(uid) !== null;
  }

}
