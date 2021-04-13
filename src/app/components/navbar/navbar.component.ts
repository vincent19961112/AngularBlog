import { PostsService } from './../../services/posts.service';
import { Observable } from 'rxjs';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  theme:string = 'custom-theme-1';
  isAuthenticated;
  Author: Observable<any>;
  AuthorUid: string;

  constructor(
    private postApi:PostsService,
    private AuthorApi:AuthorsService
    ) { }


  ngOnInit(): void {
    this.AuthorApi.currentAuthStatus.subscribe(authStatus => this.isAuthenticated = authStatus)

  }

  themeChange(){
    this.theme = this.theme == 'custom-theme-1' ? 'custom-theme-2' : 'custom-theme-1';
    this.postApi.sendThemeChange(this.theme);
  }


  SignOut(){
    this.AuthorApi.signOut();
  }

}
