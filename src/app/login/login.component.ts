import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  private user: User;

  constructor(
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.login(this.currUser.Email, this.currUser.password).then((user) => {
      this.router.navigate(['/']);
    }).catch((error) => {
      this.hasError = true;
      this.badPassword = error.code==="auth/wrong-password";
      this.errorMessage = "Something went wrong";
    });
  }

  currUser: User = new User;

  hasError = false;
  badPassword = false;
  errorMessage = "";

}
