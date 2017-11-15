import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-user-approvement',
  templateUrl: './user-approvement.component.html',
  styleUrls: ['./user-approvement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserApprovementComponent implements OnInit {

  pendingUsers: Observable<any>;

  constructor(public afDb: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.pendingUsers = this.getPendingUsers();
  }

  getPendingUsers(): Observable<any> {
    return this.afDb.list('Approved', ref => ref.orderByChild('Approved').equalTo(true)).snapshotChanges();
  }

  onAccept(uid: string) {
    // save user attribute
  }

  onDecline(uid:string){
    // delete user
  }
}
