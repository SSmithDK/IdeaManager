import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Idea } from '../Idea';

@Injectable()
export class CommentService {

  constructor(private afDb: AngularFireDatabase) { }

  createComment(idea: Idea, title: string, content: string, userID: string, userName: string) {
    const ref = this.afDb.list('Comments').query.ref.push();
    ref.set({
      Title: title,
      Content: content,
      User: userID,
      OwnerName: userName,
      Timestamp: +new Date,
      Aproved: false
    });
    return ref.key;
  }

  // trying to update the Idea
  createComment2(idea: Idea, title: string, content: string, userID: string, userName: string) {
    /*const ref = this.afDb.list('Idea/${idea.id}').query.ref.update();
    ref.set({
      Title: title,
      Content: content,
      User: userID,
      OwnerName: userName,
      Timestamp: +new Date,
      Aproved: false
    });
    return ref.key;*/
  }

/*
  getComments(idea_id: string): Observable<any> { //TODO get only comments for an idea_id
    return this.afDb.list<any>('Comments', ref => ref.limitToLast(10)).snapshotChanges().map((arr) => {
      return arr.sort(function(a, b) {
        var keyA = a.payload.val().Timestamp,
            keyB = b.payload.val().Timestamp;
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    });
  }

  getComment(id: string): Observable<any> {
    return this.afDb.object<any>(`Comments/${id}`).snapshotChanges().map(action => {
      const $key = action.payload.key;
      const data = { $key, ...action.payload.val() };
      return data;
    });
  }
*/
}
