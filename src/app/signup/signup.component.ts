import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  hasError = false;
  errorMessage = "";


  onSubmit(formData: NgForm) {
    if(formData.valid)
    {
      this.authService.createUser(formData.value.email, formData.value.password).then((user) => {
        // User created, add details
        user.updateProfile({
          displayName: formData.value.name
        });
        this.userService.updateName(user.uid, formData.value.name);
      }).then( () => {
        // Success
        this.router.navigate(['/']);
      }).catch( (err) => {
        // Handle errors
        this.hasError = true;
        this.errorMessage = err.message;
      });
    }
  }
}
