import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent implements OnInit {

  constructor(
    private afAuth: AngularFireAuth
  ) { 
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  ngOnInit() {
  }

  public isAuthenticated(): boolean {
    return this.authState !== null;
  }

  authState: any = null;

}
