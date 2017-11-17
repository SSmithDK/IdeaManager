import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {User} from "../user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-approvement',
  templateUrl: './user-approvement.component.html',
  styleUrls: ['./user-approvement.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserApprovementComponent implements OnInit {

  pendingUsers: Observable<User[]>;

  hasError = false;
  errorMessage = "";

  constructor(
    public afDb: AngularFireDatabase,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.pendingUsers = this.userService.getPendingUsers();
  }

  onAccept(uid: string) {

    this.userService.approveUser(uid, (error) => {

      if(error !== null) {
        this.hasError = true;
        this.errorMessage = error.message;
      }

    });

  }

  onDecline(uid:string) {

    this.userService.deleteUser(uid, (error) => {

      if(error !== null) {
        this.hasError = true;
        this.errorMessage = error.message;
      }
      
    });

  }
}
