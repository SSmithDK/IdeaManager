import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
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

  model = new User("", "", "");
  hasError = false;
  errorMessage = "";


  onSubmit() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.model.email, this.model.password).then((user) => {
      // User created, add details
      firebase.database().ref(`Users/${user.uid}`).set({
        Name: this.model.name
      });
    }).then( () => {
      // Success
      this.router.navigate(['/']);
    }).catch( (err) => {
      // Handle errors
      this.hasError = true;
      this.errorMessage = err.message;
    });
  }
}
