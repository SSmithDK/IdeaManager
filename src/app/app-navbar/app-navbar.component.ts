import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppNavbarComponent implements OnInit {

  user: User;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAuthState().subscribe((auth) => {
      if( auth !== null )
        this.getCurrentUser();
    });
  }

  private getCurrentUser(): void {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

}
