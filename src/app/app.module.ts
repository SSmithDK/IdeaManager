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
import { CreateIdeaComponent } from './create-idea/create-idea.component';
import { UserAuthGuard} from "./userauth.guard";
import { VotingIdeasComponent } from './voting-ideas/voting-ideas.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { IdeaService } from './services/idea.service';
import { UserApprovalComponent } from "./user-approval/user-approval.component";
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagService } from './services/tag.service';
import { CommentService } from './services/comment.service';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { CommentDetailsComponent } from './comment-details/comment-details.component';
import { MyIdeasComponent } from './my-ideas/my-ideas.component';
import { IdeaComponent } from './idea/idea.component';
import { ProfileComponent } from './profile/profile.component';
import { AddingReferenceIdeaComponent } from './adding-reference-idea/adding-reference-idea.component';
import { ManagerAuthGuard } from './managerauth.guard';

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
    CreateIdeaComponent,
    VotingIdeasComponent,
    IdeaDetailsComponent,
    UserApprovalComponent,
    CreateCommentComponent,
    CommentDetailsComponent,
    MyIdeasComponent,
    IdeaComponent,
    ProfileComponent,
    AddingReferenceIdeaComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    NgbModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    RouterModule,
    TagInputModule,
    BrowserAnimationsModule
  ],
  providers: [
    UserAuthGuard,
    ManagerAuthGuard,
    UserService,
    AuthService,
    AngularFireAuth,
    AngularFireDatabase,
    IdeaService,
    CommentService,
    TagService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
