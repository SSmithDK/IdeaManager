import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent implements OnInit {

  private user: User;
  private authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  ngOnInit() {
    this.userService.getAuthState().subscribe((auth) => {
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  public isAuthenticated(): boolean {
    return this.authState !== null;
  }

  public isManager(): boolean {
    return this.isAuthenticated() && this.user.Manager;
  }

}
