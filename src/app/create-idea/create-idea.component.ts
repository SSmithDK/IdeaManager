import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Idea} from "../Idea";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "firebase";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIdeaComponent implements OnInit {

  private user: User;

  hasError = false;
  errorMessage = "";
  model = new Idea("", "", "");

  constructor(public afAuth: AngularFireAuth,
              private router: Router)
  {
    this.user = this.afAuth.auth.currentUser;
  }

  ngOnInit() {
  }

  onSubmit() {

    firebase.database().ref('Ideas').push({
      Title: this.model.title,
      Description: this.model.description,
      ShortDescription: this.model.shortDescription,
      User: this.user.uid,
      Published: this.model.published,
      PositiveVotes: this.model.positiveVotes,
      NegativeVotes: this.model.negativeVotes,
      Timestamp: this.model.timestamp
    }, (err) => {
      if (err) {
        this.hasError = true;
        this.errorMessage = err.message;
      }
    }).then(() => {
      this.router.navigate(['/']);
    })
  }
}
