import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Idea } from '../Idea';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';

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

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      if(user)
      {
        this.isManager = user.Manager;
      }
    })
  }

}
