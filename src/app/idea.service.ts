import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IdeaService {

  constructor(public afDb: AngularFireDatabase) { }

  createIdea(title: string, description: string, shortDescription: string, userID: string, userName: string, published: boolean) {
    return this.afDb.database.ref("Ideas").push({
      Title: title,
      Description: description,
      ShortDescription: shortDescription,
      User: userID,
      OwnerName: userName,
      Published: published,
      Timestamp: +new Date
    });
  }

  getIdeas(): Observable<any>{
    return this.afDb.list<any>('Ideas', ref => ref.orderByChild('Timestamp').limitToLast(10)).snapshotChanges().map((arr) => { 
      return arr.sort(function(a, b){
        var keyA = a.payload.val().Timestamp,
            keyB = b.payload.val().Timestamp;
        // Compare the 2 dates
        if(keyA > keyB) return -1;
        if(keyA < keyB) return 1;
        return 0;
      });
    });
  }

  getIdea(id: string): Observable<any> {
    return this.afDb.object<any>(`Ideas/${id}`).snapshotChanges().map(action => {
      const $key = action.payload.key;
      const data = { $key, ...action.payload.val() };
      return data;
    });
  }

}
