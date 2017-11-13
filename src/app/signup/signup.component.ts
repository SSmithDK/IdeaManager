import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
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
    private afDb: AngularFireDatabaseModule,
    private router: Router
  ) { }

  ngOnInit() {
  }

  model = new User("", "", "", 0);

  onSubmit() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.model.email, this.model.password).then((user) => {
      // User created, add details
      firebase.database().ref(`Users/${user.uid}`).set({
        Name: this.model.name
      });
    }).then( () => {
      // Success
      this.router.navigate(['/']);
    }).catch(function(error){
      // Handle errors
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }
}
