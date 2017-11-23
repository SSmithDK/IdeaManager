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
  public hasVoted=false;
  public isOwner = false;
  constructor(
    public ideaService: IdeaService,
    public userService: UserService
  ) { }

  ngOnInit() {
    if(this.idea)
    {
      this.userService.currentUser.subscribe((user) => {
        if(user && this.idea)
        {
          if(user.id == this.idea.owner)
          {
            this.isOwner = true;
          }
        }
      });
      this.ideaService.checkUservoteIdea(this.idea.id,this.idea.owner)
        .then((result) => {
          if(result.user_id){
            if(this.idea.owner==result.user_id){
              //the idea is voted by user
              this.hasVoted = true;
            }
          }
      });
    }
  }

  vote_Up(idea) {
    //before vote, check if user hasnt vote this idea before
    if(!this.isOwner)
    {
      this.ideaService.checkUservoteIdea(idea.id,idea.owner)
      .then((result) => {
         if(result.user_id){
            if(idea.owner==result.user_id){
              //the idea is voted by user
              this.hasVoted = true;
            }
         }else{
          this.idea.positiveVotes++;
          this.ideaService.updateIdeaVote(idea);
          this.ideaService.saveideaUserVote(idea);
         }
      });
    }
  }

  vote_Down(idea) {
    //before vote, check if user hasnt vote this idea before
    if(!this.isOwner)
    {
      this.ideaService.checkUservoteIdea(idea.id,idea.owner)
      .then((result) => {
         if(result.user_id){
            if(idea.owner==result.user_id){
              this.hasVoted =true;
            }
         }else{
          this.idea.positiveVotes--;
          this.ideaService.updateIdeaVote(idea);
          this.ideaService.saveideaUserVote(idea);
         }
      });
    }
  }

  
}
