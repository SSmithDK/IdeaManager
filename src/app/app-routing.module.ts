import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components for routes
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LogoutComponent } from './logout/logout.component';
import { CreateIdeaComponent } from "./create-idea/create-idea.component";
import { UserAuthGuard } from "./userauth.guard";

const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'password', component: RecoverPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'create', component: CreateIdeaComponent, canActivate: [UserAuthGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
