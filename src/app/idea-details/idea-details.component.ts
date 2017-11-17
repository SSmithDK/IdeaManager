import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IdeaService } from '../services/idea.service';
import { CommentService } from '../services/comment.service';
import { User } from '../user';
import { Comment } from '../Comment';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdeaDetailsComponent implements OnInit {

  idea: Observable<any>;
  comments: Observable<any[]>;
  id: string;
  private user: User;
  public isLoggedIn: boolean;

  constructor(
    private route: ActivatedRoute,
    private ideaService: IdeaService,
    private commentService: CommentService,
    public authService: AuthService,
    private router: Router
  ) { 
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
    this.getIdea();
  }

  getIdea(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.idea = this.ideaService.getIdea(this.id);
  }

  getComments(content: string, user: string) {
    this.comments = this.commentService.getComments(this.id);
    //this.comments.push(new Comment("1", content, "2", user, this.id));
  }

  createComment(formData: NgForm) {
    if (formData.valid) {
      let v = formData.value;
      this.commentService.createComment(v.content, this.user.id, this.user.Name, this.id).then(() => {
        // Stays here and show comment!
        formData.value.content = "";
        this.getComments(v.content, this.user.Name);
      });
    }
  }


}
