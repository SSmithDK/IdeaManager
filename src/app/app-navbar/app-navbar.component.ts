import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "../user";
import {AuthService} from "../auth.service";
import {UserService} from "../user.service";
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
    this.user = new User;
    this.authService.afAuth.authState.subscribe((auth) => {
      if( auth == null )
      {
        this.isLoggedIn = false;
        this.user.Name = "";
        this.user.Email = "";
      }
      else
      {
        this.isLoggedIn = true;
        this.user.id = auth.uid;
        this.user.Name = auth.displayName;
        this.user.Email = auth.email;
      }
    });
  }

  ngOnInit() {
  }

  private getCurrentUser(): void {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public isManager(): boolean {
    return this.isLoggedIn && this.userService.isManager(this.user.id);
  }

}
