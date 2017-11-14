import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  ideasObservable: Observable<any[]>;

  constructor(
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.ideasObservable = this.getIdeas('/Ideas');
  }
  // TODO: map valus into a proper array.
  getIdeas(listPath): Observable<any[]> {
    return this.afDb.list<any>('Ideas', ref => ref.orderByChild('Timestamp').limitToLast(10)).snapshotChanges().map((arr) => { 
      return arr.sort(function(a, b){
        var keyA = a.payload.val().Timestamp,
            keyB = b.payload.val().Timestamp;
        // Compare the 2 dates
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    });
  }


}
