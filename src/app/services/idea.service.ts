import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Tag } from '../tag';
import { TagService } from './tag.service';
import { Idea } from '../Idea';

@Injectable()
export class IdeaService {

  constructor(public afDb: AngularFireDatabase, public tagService: TagService) { }

  createIdea(title: string, description: string, shortDescription: string, userID: string, userName: string, tags?: any[], published?: boolean) {
    var saveTags: {ID: string, Title: string}[] = [];
    for(var i=0; i < tags.length; i++)
    {
      if( tags[i].id==null ) // If the tag doesn't exist, create it
      {
        tags[i].id = this.tagService.addTag(tags[i].display);
      }
      saveTags.push({ID: tags[i].id, Title: tags[i].display});
    }
    console.log(saveTags);
    return this.afDb.database.ref("Ideas").push({
      Title: title,
      Description: description,
      ShortDescription: shortDescription,
      User: userID,
      OwnerName: userName,
      Published: published,
      Timestamp: +new Date,
      Tags: saveTags,
      PositiveVote:0,
      NegativeVote:0

    });
  }

  getIdeas(): Observable<Idea[]>{
    return this.afDb.list<any>('Ideas', ref => ref.orderByChild('Published').equalTo(true)).snapshotChanges().map((arr) => { 
      return arr.sort(function(a, b){
        var keyA = a.payload.val().Timestamp,
            keyB = b.payload.val().Timestamp;
        // Compare the 2 dates
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    }).map((arr) => {
      return arr.map((item) => {
        var idea = new Idea;
        var pv = item.payload.val();
        idea.id = item.key;
        idea.title = pv.Title;
        idea.description = pv.Description;
        idea.shortDescription = pv.ShortDescription;
        idea.owner = pv.User;
        idea.username = pv.OwnerName;
        idea.published = pv.published;
        idea.negativeVotes = pv.NegativeVote;
        idea.positiveVotes = pv.PositiveVote;
        idea.timestamp = pv.Timestamp;
        idea.tags = pv.Tags.map((tagItem) => {
          var tag = new Tag;
          tag.id = tagItem.ID;
          tag.title = tagItem.Title;
          return tag;
        });
        return idea;
      });
    });
  }

  getIdea(id: string): Observable<Idea> {
    return this.afDb.object<any>(`Ideas/${id}`).snapshotChanges().map(action => {
      const $key = action.payload.key;
      const data = { $key, ...action.payload.val() };
      return data;
    });
  }

}
