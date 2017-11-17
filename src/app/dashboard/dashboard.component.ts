import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { IdeaService } from '../idea.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  ideasObservable: Observable<any[]>;

  constructor(
    public ideaService: IdeaService
  ) { }

  ngOnInit() {
    this.ideasObservable = this.ideaService.getIdeas();
  }
}
