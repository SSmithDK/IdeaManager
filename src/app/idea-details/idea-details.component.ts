import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdeaDetailsComponent implements OnInit {

  idea: Observable<any>;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private afDb: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.getIdea();
  }

  getIdea(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.idea = this.afDb.object<any>(`Ideas/${this.id}`).snapshotChanges().map(action => {
      const $key = action.payload.key;
      const data = { $key, ...action.payload.val() };
      return data;
    });
  }

}
