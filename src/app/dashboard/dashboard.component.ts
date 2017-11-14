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

  listings: any[] = [];

  constructor(
    public afAuth: AngularFireAuth,
    public afDb: AngularFireDatabase
  ) {
    this.afDb.object('Ideas')
      .snapshotChanges()
      .map(action =>{
        const data = action.payload.toJSON();
        return data;
      }).subscribe(result =>{ 
        this.listings = [];
        Object.keys(result).map(key=>{ 
          this.listings.push({ 
            'key': key, 
            'data':result[key] 
          }); 
        }); 
        this.listings.reverse();
      });
   }

  ngOnInit() {
  }
}
