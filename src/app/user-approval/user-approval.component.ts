import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {User} from "../user";
import {UserService} from "../services/user.service";
import {AdminService} from "../services/admin.service";

@Component({
  selector: 'app-user-approval',
  templateUrl: './user-approval.component.html',
  styleUrls: ['./user-approval.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserApprovalComponent implements OnInit {

  pendingUsers: Observable<User[]>;

  hasError = false;
  errorMessage = "";

  constructor(
    private userService: UserService,
    private adminService: AdminService
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

    this.adminService.deleteUser(uid, (error) => {
      this.hasError = true;
      this.errorMessage = error.message;
    });

    this.userService.deleteUser(uid, (error) => {

      if(error !== null) {
        this.hasError = true;
        this.errorMessage = error.message;
      }

    });

  }
}
