import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Tag } from '../tag';
import { TagService } from './tag.service';
//import { CommentService } from './comment.service';
import { Idea } from '../Idea';
import { Comment } from '../Comment';
import { of } from 'rxjs/observable/of';

@Injectable()
export class IdeaService {

  constructor(public afDb: AngularFireDatabase, public tagService: TagService /*, public commentService: CommentService*/) { }

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
        if(pv.Tags)
        {
          idea.tags = pv.Tags.map((tagItem) => {
            var tag = new Tag;
            tag.id = tagItem.ID;
            tag.title = tagItem.Title;
            return tag;
          });
        }
        else
        {
          idea.tags = [];
        }
//        var cmts = this.commentService.getComments(item.key);
//        if (cmts) {
          /*idea.comments = cmts; 
          idea.comments = cmts.map((commentItem) => {
            var comment = new Comment(commentItem.Title, commentItem.Content, commentItem.User, commentItem.OwnerName);
            comment.id = commentItem.ID;
            comment.timestamp = commentItem.Timestamp;
            comment.aproved = commentItem.Aproved;
            return comment; 
          }); */
//        } else {
//            idea.comments = [];
//        }
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
          if(pv.Tags)
          {
            idea.tags = pv.Tags.map((tagItem) => {
              var tag = new Tag;
              tag.id = tagItem.ID;
              tag.title = tagItem.Title;
              return tag;
            });
          }
          else
          {
            idea.tags = [];
          }
          //idea.comments = this.commentService.getComments(item.key);
          /*var cmts = this.commentService.getComments(item.key);
          if (cmts) {
            idea.comments = cmts.map((commentItem) => {
              var comment = new Comment(commentItem.Title, commentItem.Content, commentItem.User, commentItem.OwnerName);
              comment.id = commentItem.ID;
              comment.timestamp = commentItem.Timestamp;
              comment.aproved = commentItem.Aproved;
              return comment;
            });
          } else {
              idea.comments = [];
          }*/
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
      if(pv.Tags)
      {
        idea.tags = pv.Tags.map((tagItem) => {
          var tag = new Tag;
          tag.id = tagItem.ID;
          tag.title = tagItem.Title;
          return tag;
        });
      }
      else
      {
        idea.tags = [];
      }
      //idea.comments = this.commentService.getComments(action.key);
      /*var cmts = this.commentService.getComments(action.key);
      if (cmts) {
        idea.comments = cmts.map((commentItem) => {
          var comment = new Comment(commentItem.Title, commentItem.Content, commentItem.User, commentItem.OwnerName);
          comment.id = commentItem.ID;
          comment.timestamp = commentItem.Timestamp;
          comment.aproved = commentItem.Aproved;
          return comment;
        });
      } else {
          idea.comments = [];
      }*/
      return idea;
    });
  }

  updateIdeaVote(idea:Idea):void{
    this.afDb.object('Ideas/'+idea.id).update({PositiveVote:idea.positiveVotes});
  }

}
