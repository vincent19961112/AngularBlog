import { RegistedComponent } from './components/registed/registed.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ArticleComponent } from './components/home/article/article.component';
import { AboutComponent } from './components/about/about.component';
import { PostComponent } from './components/post/post.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'registed',component:RegistedComponent},
  {path:'signIn',component:SignInComponent},
  {path:'home',component:HomeComponent},
  {path:'article/:id',component:ArticleComponent},
  {path:'about',component:AboutComponent},
  {path:'post',component:PostComponent},
  {path:'post/:id',component:EditPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
