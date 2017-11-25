import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { IdeaService } from '../services/idea.service';
import { AuthService } from '../services/auth.service';
import { TagService } from '../services/tag.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Tag } from '../tag';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Idea } from '../Idea';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIdeaComponent implements OnInit {

  private user = new User;
  public isLoggedIn: boolean;
  public ideaID: string;
  public isRef = false;
  public editing = false;
  public idea: Idea = new Idea;

  public ideaReferenced: Idea = new Idea;
  
  items: Tag[];
  tags;

  hasError = false;
  errorMessage = "";

  constructor(
    private route: ActivatedRoute,
    public ideaService: IdeaService,
    public tagService: TagService,
    public userService: UserService,
    private router: Router)
  {
    this.userService.currentUser.subscribe((user) => {
      this.user = user;
    });
   }

  ngOnInit() {
    this.idea.published = false; // Default for radio buttons
    if(+this.route.snapshot.paramMap.get("ref") === 1 && this.route.snapshot.paramMap.get("id"))
    {
      this.ideaID = this.route.snapshot.paramMap.get("id");
      this.isRef = true;
      this.ideaService.getIdea(this.ideaID).subscribe((ideaReferenced) => this.ideaReferenced = ideaReferenced);
    }
    else if(+this.route.snapshot.paramMap.get("edit") === 1 && this.route.snapshot.paramMap.get("id"))
    {
      this.ideaID = this.route.snapshot.paramMap.get("id");
      this.editing = true;
      this.ideaService.getIdea(this.ideaID).subscribe((idea) => this.idea = idea);
    }
  }

  autocompleteItems = (text: string): Observable<Tag[]> => {
    return this.tagService.getAllTags();
  }

  onSubmit(formData: NgForm) {
    if( formData.valid )
    {
      let v = formData.value;
      if(this.editing){
        this.ideaService.updateIdea(this.idea).then(() => {
          this.router.navigate([`/details/${this.idea.id}`]);
        });
      } else if(this.isRef){
        //save new idea 
        this.ideaService.createIdea(v.title, v.description, v.short_desc, this.user.id, this.user.Name, v.tags, v.published).then((newIdeaRef) => {
        
          //save references of child
          this.ideaService.createReferenceIdea(newIdeaRef.key,this.ideaReferenced.id,this.ideaReferenced.title);
          this.router.navigate(['/']);
        });
      } else{
        this.ideaService.createIdea(v.title, v.description, v.short_desc, this.user.id, this.user.Name, v.tags, v.published).then(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }
}
