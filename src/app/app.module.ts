import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// quill 模組
import { QuillModule } from 'ngx-quill';
// form 模組
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//Material 模組
import { MaterialModule } from './models/material/material.module';
//flexLayout 模組
import { FlexLayoutModule } from '@angular/flex-layout';
//component 匯入
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostComponent } from './components/post/post.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostDialogComponent } from './components/Post-dialog/Post-dialog.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/home/main/main.component';
import { TimerComponent } from './components/home/timer/timer.component';
import { RightListComponent } from './components/home/right-list/right-list.component';
import { LeftListComponent } from './components/home/left-list/left-list.component';
import { ArticleComponent } from './components/home/article/article.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RegistedComponent } from './components/registed/registed.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { ChartComponent } from './components/home/chart/chart.component';
//firebase 模組
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
//directive 匯入
import { MustMatchDirective } from './_helpers/Must-match.directive';
//chart.js
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    PostDialogComponent,
    FooterComponent,
    MainComponent,
    TimerComponent,
    RightListComponent,
    LeftListComponent,
    ArticleComponent,
    SignInComponent,
    RegistedComponent,
    EditPostComponent,
    DeleteDialogComponent,
    MustMatchDirective,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot({
      theme:"snow",
       modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike',{ color: [] }, { background: [] }],
          ['blockquote', 'code-block',{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] },{'align':[]},{'font':[]}],
          ['link','image','video','clean'],
        ]
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
