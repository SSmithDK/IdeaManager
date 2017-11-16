import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Idea} from "../Idea";
import * as firebase from 'firebase/app';
import {Router} from "@angular/router";
import { UserService } from '../user.service';
import { User } from '../user';

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

  constructor(public userService: UserService,
              private router: Router)
  { }

  ngOnInit() {
    this.userService.getAuthState().subscribe((auth) => {
      this.getCurrentUser();
    });
  }

  private getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  onSubmit() {
    firebase.database().ref('Ideas').push({
      Title: this.model.title,
      Description: this.model.description,
      ShortDescription: this.model.shortDescription,
      User: this.user.id,
      OwnerName: this.user.Name,
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
