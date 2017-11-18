import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MockCommentService {

  constructor() { }

  createComment(content: string, userID: string, userName: string, ideaID: string) {
    // Do nothing, act like comment has been created
  }

  getComments(idea_id: string): Observable<any> { //TODO get only comments for an idea_id
    // Don't return any commments
    return of(null);
  }

  getComment(id: string): Observable<any> {
    // Don't return any comment
    return of(null);
  }

}
