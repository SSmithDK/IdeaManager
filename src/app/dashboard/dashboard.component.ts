import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IdeaService } from '../services/idea.service';
import { Idea } from '../Idea';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  ideasObservable: Observable<Idea[]>;

  isApproved: boolean;

  constructor(
    public ideaService: IdeaService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.ideasObservable = this.ideaService.getIdeas();

    this.userService.currentUser.subscribe((user) => {
      if (user !== null) {
        this.isApproved = user.Approved;
      }
      else {
        this.isApproved = false;
      }
    });
  }
}
