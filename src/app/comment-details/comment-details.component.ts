import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommentService } from '../services/comment.service';
import { Input } from '@angular/core/';

@Component({
  selector: 'app-comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentDetailsComponent implements OnInit {

  @Input() comment: Comment;

  constructor(
    //private route: ActivatedRoute,
    //private commentService: CommentService
  ) { }

  ngOnInit() {
    //this.getComment();
  }

  getComment(): void {
    //this.id = this.route.snapshot.paramMap.get("id");
    //this.comment = this.commentService.getComment(this.id);
    //this.comment = this.commentService.getComment(this.id);
  }

}
