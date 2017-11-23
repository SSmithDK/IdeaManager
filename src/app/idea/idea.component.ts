import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Idea } from '../Idea';
import { User } from '../user';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { IdeaService } from '../services/idea.service';

@Component({
  selector: 'idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdeaComponent implements OnInit {

  @Input() idea: Idea;
  @Input() full: boolean;

  public isManager = false;
  private user = new User;
  canRemoveIdea = false;
  hasError = false;
  errorMessage = "";

  constructor(
    public ideaService: IdeaService,
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    })

  }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      if(user)
      {
        this.isManager = user.Manager;
      }
    })
    this.canRemoveIdea = (this.idea.owner == this.user.id || this.user.Manager);
  }

  deleteIdea() {
    if (this.canRemoveIdea && confirm("Are you sure you wish to delete this idea?")) {
      this.ideaService.deleteIdea(this.idea.id, (error) => {
        if (error !== null) {
          this.hasError = true;
          this.errorMessage = error.message;
        }
      });
    }
  }

}
