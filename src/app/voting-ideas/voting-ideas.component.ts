import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core/';
import { Idea } from '../Idea';
import { IdeaService } from '../services/idea.service';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'voting-ideas',
  templateUrl: './voting-ideas.component.html',
  styleUrls: ['./voting-ideas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VotingIdeasComponent implements OnInit {
  @Input() idea:Idea;
  public hasVote=false;
  constructor(public ideaService: IdeaService) {}

  ngOnInit() {
  }

  vote_Up(idea) {
    //before vote, check if user hasnt vote this idea before
    this.ideaService.checkUservoteIdea(idea.id,idea.owner)
    .then((result) => {
       if(result.user_id){
          if(idea.owner==result.user_id){
            //the idea is voted by user
            this.hasVote = true;
          }
       }else{
        this.idea.positiveVotes++;
        this.ideaService.updateIdeaVote(idea);
        this.ideaService.saveideaUserVote(idea);
       }
    });
   
  }

  vote_Down(idea) {
    //before vote, check if user hasnt vote this idea before
    this.ideaService.checkUservoteIdea(idea.id,idea.owner)
    .then((result) => {
       if(result.user_id){
          if(idea.owner==result.user_id){
            this.hasVote =true;
          }
       }else{
        this.idea.positiveVotes--;
        this.ideaService.updateIdeaVote(idea);
        this.ideaService.saveideaUserVote(idea);
       }
    });
   }

  
}
