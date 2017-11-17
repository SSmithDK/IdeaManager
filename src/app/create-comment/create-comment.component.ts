import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import { User } from '../user';
//import { Idea } from '../idea';
import { NgForm } from '@angular/forms';
//import { IdeaService } from '../idea.service';
import { CommentService } from '../services/comment.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCommentComponent implements OnInit {

  private user: User;
  public isLoggedIn: boolean;

  hasError = false;
  errorMessage = "";

  constructor(
    public commentService: CommentService,
    public authService: AuthService,
    private router: Router) {
      this.user = new User;
      this.authService.afAuth.authState.subscribe((auth) => {
        if (auth == null) {
          this.isLoggedIn = false;
          this.user.Name = "";
          this.user.Email = "";
        } else {
          this.isLoggedIn = true;
          this.user.id = auth.uid;
          this.user.Name = auth.displayName;
          this.user.Email = auth.email;
        }
      });
  }

  ngOnInit() {
  }

  onSubmit(formData: NgForm) {
    if (formData.valid) {
      let v = formData.value;
      this.commentService.createComment(v.content, this.user.id, this.user.Name, v.idea_id);
    }
  }

}
