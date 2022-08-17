import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { FollowersComponent } from './components/followers/followers.component';
import { SearchComponent } from './components/search/search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';


const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent },
  { path: "followers", component: FollowersComponent },
  { path: "search", component: SearchComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "update-user", component: UserUpdateComponent },
  { path: "scroll-to-top", component: ScrollToTopComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
