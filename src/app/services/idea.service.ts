import { Injectable } from '@angular/core';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Tag } from '../tag';
import { TagService } from './tag.service';
import { Idea } from '../Idea';
import { Comment } from '../Comment';
import { of } from 'rxjs/observable/of';
import { VotedIdea } from '../VotedIdea';
import {SearchService} from "./search.service";

@Injectable()
export class IdeaService {
  public voteIdea$: Observable<any>;

  constructor(public afDb: AngularFireDatabase, public tagService: TagService, public searchService: SearchService /*, public commentService: CommentService*/) { }

  createIdea(title: string, description: string, shortDescription: string, userID: string, userName: string, tags?: any[], published?: boolean) {
    const saveTags: { ID: string, Title: string }[] = [];
    for(let i=0; i < tags.length; i++)
    {
      if( tags[i].id==null ) // If the tag doesn't exist, create it
      {
        tags[i].id = this.tagService.addTag(tags[i].display);
      }
      saveTags.push({ID: tags[i].id, Title: tags[i].display});
    }

    const timestamp = +new Date;

    const result = this.afDb.database.ref("Ideas").push({
      Title: title,
      Description: description,
      ShortDescription: shortDescription,
      User: userID,
      OwnerName: userName,
      Published: published,
      Timestamp: timestamp,
      Tags: saveTags,
      PositiveVote: 0,
      NegativeVote: 0
    });

    this.searchService.pushIdeaToIndex(result.key,
      title, description, shortDescription, userID, userName, saveTags, timestamp, published);

    return result;
  }

  getIdeas(): Observable<Idea[]>{
    return this.afDb.list<any>('Ideas', ref => ref.orderByChild('Published').equalTo(true)).snapshotChanges().map((arr) => {
      return arr.sort(function(a, b){
        var keyA = a.payload.val().Timestamp,
            keyB = b.payload.val().Timestamp;
        // Compare the 2 timestamps
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
        idea.published = pv.Published;
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

  getIdeasFromUser(userID: string): Observable<Idea[]> {
    if(userID != null)
    {
      return this.afDb.list<any>('Ideas', ref => ref.orderByChild('User').equalTo(userID)).snapshotChanges().map((arr) => {
        return arr.sort(function(a, b) {
          var keyA = a.payload.val().Timestamp,
              keyB= b.payload.val().Timestamp;
          // Compare the two timestamps
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
          idea.published = pv.Published;
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
    else
    {
      return of(null);
    }

  }

  getIdea(id: string): Observable<Idea> {
    return this.afDb.object<any>(`Ideas/${id}`).snapshotChanges().map(action => {
      var idea = new Idea;
      var pv = action.payload.val();
      idea.id = action.key;
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
        var tag = new Tag;
        tag.id = tagItem.ID;
        tag.title = tagItem.Title;
        return tag;
      });
      return idea;
    });
  }

  deleteIdea(ideaID: string, onComplete?: (a: Error | null) => any) {
    this.afDb.database.ref(`Ideas/${ideaID}`).remove(onComplete);
  }

  updateIdea(idea: Idea) {
    var saveTags: {ID: string, Title: string}[] = [];
    for(var i=0; i < idea.tags.length; i++)
    {
      if( idea.tags[i].id==null ) // If the tag doesn't exist, create it
      {
        idea.tags[i].id = this.tagService.addTag(idea.tags[i].title);
      }
      saveTags.push({ID: idea.tags[i].id, Title: idea.tags[i].title});
    }
    const result = this.afDb.object(`Ideas/${idea.id}`).update({
      Title: idea.title,
      Description: idea.description,
      ShortDescription: idea.shortDescription,
      User: idea.owner,
      OwnerName: idea.username,
      Published: idea.published,
      Tags: saveTags,
    });

    this.searchService.updateIdeaInIndex(idea.id, idea.title, idea.description, idea.shortDescription, idea.owner,
      idea.username, idea.published, saveTags);

    return result;
  }

  updateIdeaVote(idea:Idea):void{
    //update total votes of idea
    this.afDb.database.ref('Ideas/'+idea.id)
    .update({PositiveVote:idea.positiveVotes});
  }

  saveideaUserVote(idea:Idea):void{
    var ref=this.afDb.database.ref(`VotedIdea/${idea.id}`);
    ref.set({user_id:idea.owner});
  }

  checkUservoteIdea(idea_id:string,user_id):Promise<VotedIdea>{
    let myFirstPromise = new Promise<VotedIdea>((resolve, reject) => {
      this.afDb.database.ref(`VotedIdea/${idea_id}`)
      .on('value',function(datasnapshot){
        var vI=new VotedIdea();
        vI.idea_id=idea_id;
        if(datasnapshot.val()!=null){
          vI.user_id=datasnapshot.val().user_id;
        }
        resolve(vI);
      })
    });
    return myFirstPromise;
  }

  // /**
  //  * This methods create a relationship between a "child" idea that reference to a "parent" idea
  //  * @param idParent key of parent idea
  //  * @param idChild key of child idea
  //  */
  // createChildIdea(idParent:string,idChild){
  //   //TODO
  //   return this.afDb.database.ref("ReferenceIdeas").push({
  //     idParent:idParent,
  //     idChild:idChild
  //   });
  // }

  // /**
  //  * get all related ideas with a parent idea
  //  * @param idParent
  //  */
  // getChildsIdeaOfParent(idParent:string){
  // //TODO
  // }


}
