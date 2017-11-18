import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  private user = new User;
  private isLoggedIn: boolean;
  public currentUser = new Subject<User>();

  constructor(
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.authService.isAuthorized.subscribe((isAuth) => {
      this.isLoggedIn = isAuth;
      if(isAuth)
      {
        this.afAuth.auth.onAuthStateChanged((user) => {
          if(user != null)
          {
            this.user.id = user.uid;
            this.user.Name = user.displayName;
            this.user.Email = user.email;
            this.user.Manager = this.isManager(user.uid);
            this.currentUser.next(this.user);
            this.isApproved(user.uid);
          }
          else
          {
            this.isLoggedIn = false;
            this.user = new User();
          }
        });
      }
      else
      {
        this.user = new User();
        this.currentUser.next(this.user);
      }
    });
   }

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

  public isApproved(uid: string) {
    this.afDb.object(`Users/${uid}`).snapshotChanges().take(1).subscribe((user) => {
      this.user.Approved = user.payload.val().Approved;
      this.currentUser.next(this.user);
    });
  }

}
