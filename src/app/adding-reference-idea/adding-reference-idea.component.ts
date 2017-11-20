import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Idea } from '../Idea';
import { IdeaService } from '../services/idea.service';

@Component({
  selector: 'app-adding-reference-idea',
  templateUrl: './adding-reference-idea.component.html',
  styleUrls: ['./adding-reference-idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddingReferenceIdeaComponent implements OnInit {

  @Input() idea: Idea;
  
  constructor(public ideaService: IdeaService,)
  { }
  

  ngOnInit() {
  }
}
