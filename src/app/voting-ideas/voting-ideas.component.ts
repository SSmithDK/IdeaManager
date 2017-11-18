import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core/';
import { Idea } from '../Idea';
import { IdeaService } from '../services/idea.service';
import { User } from '../user';

@Component({
  selector: 'voting-ideas',
  templateUrl: './voting-ideas.component.html',
  styleUrls: ['./voting-ideas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VotingIdeasComponent implements OnInit {
  @Input() idea:Idea;
  
  constructor(
    public ideaService: IdeaService,
  ) { }

  ngOnInit() {
  }

  vote_Up(idea) {
    this.idea.positiveVotes++;
    this.ideaService.updateIdeaVote(idea)
  }

  vote_Down(idea) {
    this.idea.positiveVotes--;
    this.ideaService.updateIdeaVote(idea)
  }

  
}
