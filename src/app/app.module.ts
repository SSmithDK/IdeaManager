import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Environment
import { environment } from '../environments/environment';

// Ng-Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LogoutComponent } from './logout/logout.component';
import { CreateIdeaComponent } from './create-idea/create-idea.component';
import {AuthGuard, UserAuthGuard} from "./userauth.guard";

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    SignupComponent,
    DashboardComponent,
    LoginComponent,
    RecoverPasswordComponent,
    LogoutComponent,
    CreateIdeaComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
