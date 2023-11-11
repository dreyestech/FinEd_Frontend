import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AboutComponent } from './about/about.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { PostComponent } from './post/post.component';


export const routes: Routes = [
  {
    path: '', 
    component : HomeComponent
  },
  {
    path: 'home', 
    component : HomeComponent
  },
  {
    path: 'about', 
    component : AboutComponent
  },
  {
    path: 'dashboard', 
    component : DashboardComponent
  },
  {
    path: 'signin', 
    component : SigninComponent
  },
  {
    path: 'signup', 
    component : SignupComponent
  },
  {
    path: 'profile', 
    component : ProfileComponent
  },
  {
    //username here is dynamic
    path: 'profile/:username', 
    component : ProfileComponent
  },
  {
    path: 'create-post', 
    component : CreatePostComponent
  },
  {
    path: 'post-feed', 
    component : PostFeedComponent
  },
  {
    path: 'post', 
    component : PostComponent
  },
  {
    //not found page
    path: '**', 
    component : NotfoundComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
