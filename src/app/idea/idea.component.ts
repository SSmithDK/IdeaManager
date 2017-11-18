import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Idea } from '../Idea';

@Component({
  selector: 'idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdeaComponent implements OnInit {

  @Input() idea: Idea;

  constructor() { }

  ngOnInit() {
  }

}
