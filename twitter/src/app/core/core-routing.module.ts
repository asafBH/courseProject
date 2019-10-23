import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProfilesComponent } from './views/profiles/profiles.component';
import { HomeComponent } from './views/home/home.component';
import { TweetComponent } from './views/tweet/tweet.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile/:userId',
    component: ProfilesComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tweet/:id',
    component: TweetComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
