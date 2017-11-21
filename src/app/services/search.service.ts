
import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {Idea} from "../Idea";
import {Tag} from "../tag";
import {IdeaService} from "./idea.service";

@Injectable()
export class SearchService {

  constructor(private afDb: AngularFireDatabase, private ideaService: IdeaService) {}

  searchTitles(title: string): Observable<Idea[]> {

    return this.afDb.list<any>('Ideas', ref => ref.orderByChild('Title').startAt(title)
      .endAt(title + "\uf8ff")).snapshotChanges().map((arr) => {
      return arr.sort(function(a, b){
        const keyA = a.payload.val().Published,
          keyB = b.payload.val().Published;
        // TODO Maybe compare by draft or published
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    }).map((arr) => {
      return arr.map((item) => {
        const idea = new Idea;
        const pv = item.payload.val();
        idea.id = item.key;
        idea.title = pv.Title;
        idea.description = pv.Description;
        idea.shortDescription = pv.ShortDescription;
        idea.owner = pv.User;
        idea.username = pv.OwnerName;
        idea.published = pv.Published;
        idea.negativeVotes = pv.NegativeVote;
        idea.positiveVotes = pv.PositiveVote;
        idea.timestamp = pv.Timestamp;
        idea.tags = pv.Tags.map((tagItem) => {
          const tag = new Tag;
          tag.id = tagItem.ID;
          tag.title = tagItem.Title;
          return tag;
        });
        return idea;
      });
    });
  }

  searchTags(title: string): Observable<Idea[]> {

    return this.ideaService.getIdeas().map(idea =>
      idea.filter(item => {
        return item.tags.map(item => item.title.toLowerCase()).indexOf(title.toLowerCase()) > -1;
      }));
  }

}
