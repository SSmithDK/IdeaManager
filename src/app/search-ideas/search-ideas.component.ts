import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Idea} from "../Idea";

@Component({
  selector: 'app-search-ideas',
  templateUrl: './search-ideas.component.html',
  styleUrls: ['./search-ideas.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchIdeasComponent implements OnInit {

  isApproved: boolean;
  searchTerm: string;

  searchResults: Observable<Idea[]>;

  constructor(private route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      if (user !== null) {
        this.isApproved = user.Approved;
      }
      else {
        this.isApproved = false;
      }
    });

    if(this.route.snapshot.paramMap.get("term"))
    {
      this.searchTerm = this.route.snapshot.paramMap.get("term");
    }
  }

}
