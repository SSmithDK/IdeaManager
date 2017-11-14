import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-voting-ideas',
  templateUrl: './voting-ideas.component.html',
  styleUrls: ['./voting-ideas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VotingIdeasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  TitleIdea="Title Idea example";
  DescriprionIdea=" Description idea example";
  Comment="";
  SeeComments="";
  PositiveVotes=0;
  NegativeVotes=0;
  status="status"
}
