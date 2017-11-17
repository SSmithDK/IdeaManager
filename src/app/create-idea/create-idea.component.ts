import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import { User } from '../user';
import { NgForm } from '@angular/forms';
import { IdeaService } from '../idea.service';
import { AuthService } from '../auth.service';
import { TagService } from '../tag.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { Tag } from '../tag';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateIdeaComponent implements OnInit {

  private user: User;
  public isLoggedIn: boolean;

  items: Tag[];

  tags;

  hasError = false;
  errorMessage = "";

  constructor(
    public ideaService: IdeaService,
    public authService: AuthService,
    public tagService: TagService,
    private router: Router)
  {
    this.user = new User;
    this.authService.afAuth.authState.subscribe((auth) => {
      if( auth == null )
      {
        this.isLoggedIn = false;
        this.user.Name = "";
        this.user.Email = "";
      }
      else
      {
        this.isLoggedIn = true;
        this.user.id = auth.uid;
        this.user.Name = auth.displayName;
        this.user.Email = auth.email;
      }
    });
   }

  ngOnInit() {
  }

  autocompleteItems = (text: string): Observable<Tag[]> => {
    return this.tagService.getAllTags();
  }

  onSubmit(formData: NgForm) {
    if( formData.valid )
    {
      let v = formData.value;
      this.ideaService.createIdea(v.title, v.description, v.short_desc, this.user.id, this.user.Name, v.tags, true).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
