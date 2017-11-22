import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core/';

@Component({
  selector: 'comment-details',
  templateUrl: './comment-details.component.html',
  styleUrls: ['./comment-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommentDetailsComponent implements OnInit {

  @Input() comment: Comment;

  constructor( ) { }

  ngOnInit() {
  }

}
