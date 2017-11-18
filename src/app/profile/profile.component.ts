import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../user';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  private user = new User;

  constructor(
    private userService: UserService
  ) {
    this.userService.currentUser.subscribe((user) => {
      if( user != null )
      {
        this.user = user;
      }
      else
      {
        this.user = null;
      }
    })
   }

  ngOnInit() {
  }

  onSubmitPersonal(formData: NgForm) {
    if( formData.valid )
    {
      let v = formData.value;
      // Implementation for udpating profile
    }
  }

  onSubmitPassword(formData: NgForm) {
    if( formData.valid )
    {
      let v = formData.value;
      // Implementation for updating password
    }
  }

}
