import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

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
import { UserAuthGuard} from "./userauth.guard";
import { VotingIdeasComponent } from './voting-ideas/voting-ideas.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { IdeaService } from './idea.service';

export const firebaseConfig = {
  apiKey: "AIzaSyDGMsVOfYPh5aMTgwIEjwnwKCL3_WMQK9U",
  authDomain: "ideamanager-64747.firebaseapp.com",
  databaseURL: "https://ideamanager-64747.firebaseio.com",
  projectId: "ideamanager-64747",
  storageBucket: "ideamanager-64747.appspot.com",
  messagingSenderId: "477312275133"
};

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    SignupComponent,
    DashboardComponent,
    LoginComponent,
    RecoverPasswordComponent,
    LogoutComponent,
    CreateIdeaComponent,
    VotingIdeasComponent,
    IdeaDetailsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    UserAuthGuard,
    UserService,
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
    IdeaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
