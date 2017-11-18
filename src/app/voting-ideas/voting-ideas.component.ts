import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Input } from '@angular/core/';
import { Idea } from '../Idea';
import { IdeaService } from '../idea.service';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-voting-ideas',
  templateUrl: './voting-ideas.component.html',
  styleUrls: ['./voting-ideas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VotingIdeasComponent implements OnInit {
  @Input() idea:Idea;
  private user: User;
  public isLoggedIn: boolean;
  
  constructor(
    public ideaService: IdeaService,
    public authService: AuthService
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
    console.log(this.idea);
  }

  vote_Up(idea) {
    this.idea.positiveVotes++;
    console.log(this.idea.positiveVotes);
    this.ideaService.updateIdeaVote(idea)
  }

  vote_Down(idea) {
    this.idea.positiveVotes--;
    console.log(this.idea.positiveVotes);
    this.ideaService.updateIdeaVote(idea)
  }

  
}
