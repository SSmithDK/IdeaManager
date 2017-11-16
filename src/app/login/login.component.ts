import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    private afDb: AngularFireDatabaseModule,
    private router: Router
  ) {
    this.afAuth.authState.subscribe((auth) => {
      if( auth !== null )
      {
        this.router.navigate(['/']);
      }
    });
   }

  ngOnInit() {
  }

  onSubmit() {
    this.afAuth.auth.signInWithEmailAndPassword(this.currUser.Email, this.currUser.password).then((user) => {
      // Authenticated!
      this.router.navigate(['/']);
    }).catch((error) => {
      this.hasError = true;
      this.errorMessage = error.message;
      this.badPassword = error.code === "auth/wrong-password";
    });
  }

  currUser = new User();

  hasError = false;
  badPassword = false;
  errorMessage = "";

}
