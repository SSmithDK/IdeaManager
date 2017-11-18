import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../user";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent implements OnInit {

  user: User;
  public isLoggedIn: boolean;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) {
    this.authService.isAuthorized.subscribe((isAuth) => this.isLoggedIn = isAuth);
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public isManager(): boolean {
    return this.isLoggedIn && this.userService.isManager(this.user.id);
  }

}
