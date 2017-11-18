import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Idea } from '../Idea';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdeaComponent implements OnInit {

  @Input() idea: Idea;
  @Input() full: boolean;

  constructor() { }

  ngOnInit() {
  }

}
