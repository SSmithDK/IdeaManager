import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from '../user';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css', '../login/login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecoverPasswordComponent implements OnInit {

  hasError = false;
  errorMessage = "";
  currUser = new User("", "", "");

  constructor(
    private afAuth: AngularFireAuth,
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
    this.afAuth.auth.sendPasswordResetEmail(this.currUser.email).then( _ => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.hasError = true;
      this.errorMessage = error.message;
    });
  }

}
