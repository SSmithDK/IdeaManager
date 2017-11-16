import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {User} from "../user";

@Component({
  selector: 'app-user-approvement',
  templateUrl: './user-approvement.component.html',
  styleUrls: ['./user-approvement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserApprovementComponent implements OnInit {

  pendingUsers: Observable<any>;

  hasError = false;
  errorMessage = "";

  constructor(public afDb: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.pendingUsers = this.getPendingUsers();
  }

  getPendingUsers(): Observable<any> {
    return this.afDb.list('Users/', ref => ref.orderByChild('Approved').equalTo(false)).snapshotChanges();
  }

  onAccept(uid: string) {

    this.afDb.database.ref(`Users/${uid}/Approved`).set(true, (error) => {

      if(error !== null) {
        this.hasError = true;
        this.errorMessage = error.message;
      }

    });

  }

  onDecline(uid:string){

    this.afDb.database.ref(`Users/${uid}`).remove((error) => {

      if(error !== null) {
        this.hasError = true;
        this.errorMessage = error.message;
      }

    })
  }
}
