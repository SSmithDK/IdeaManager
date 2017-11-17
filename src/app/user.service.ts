import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

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

  public getPendingUsers(): Observable<any> {
    return this.afDb.list('Users/', ref => ref.orderByChild('Approved').equalTo(false))
      .snapshotChanges();
  }

  public isManager(uid: string) {
    return this.afDb.database.ref(`Managers/`).child(uid) !== null;
  }

}
