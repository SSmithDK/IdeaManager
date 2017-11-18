import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for routes
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { CreateIdeaComponent } from "./create-idea/create-idea.component";
import { UserAuthGuard } from "./userauth.guard";
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import {UserApprovementComponent} from "./user-approvement/user-approvement.component";
import { MyIdeasComponent } from './my-ideas/my-ideas.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [UserAuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserAuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'password', component: RecoverPasswordComponent },
  { path: 'create', component: CreateIdeaComponent, canActivate: [UserAuthGuard] },
  { path: 'details/:id', component: IdeaDetailsComponent, canActivate: [UserAuthGuard]},
  { path: 'approvement', component: UserApprovementComponent, canActivate: [UserAuthGuard]},
  { path: 'my-ideas', component: MyIdeasComponent, canActivate: [UserAuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
