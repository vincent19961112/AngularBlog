import { Component,OnInit } from '@angular/core';
import { PostsService } from './services/posts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})



export class AppComponent implements OnInit {


  title = 'quill-example';
  currentTheme:string = 'custom-theme-1';

  constructor(private postApi:PostsService
    ){}

  ngOnInit(): void {
    this.postApi.getTheme().subscribe(data=>
      this.currentTheme = data)
  }


}
