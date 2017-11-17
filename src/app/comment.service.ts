import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentService {

  constructor(public afDb: AngularFireDatabase) { }

  createComment(content: string, userID: string, userName: string, ideaID: string) {
    return this.afDb.database.ref("Comments").push({
      Content: content,
      User: userID,
      OwnerName: userName,
      Idea: ideaID,
      Timestamp: +new Date,
      Aproved: true
    })
  }

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

}
