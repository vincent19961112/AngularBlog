import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { debounceTime, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-left-list',
  templateUrl: './left-list.component.html',
  styleUrls: ['./left-list.component.scss']
})
export class LeftListComponent implements OnInit {

  SearchTitle:string;
  Tags$:Observable<any>;
  Posts$;
  @Output() search = new EventEmitter<any>();

  constructor(private postsApi:PostsService) { }

  ngOnInit(): void {
    this.postsApi.getTags().subscribe((tag:any)=>{
      this.Tags$ = tag.tags;
    })
  }

  searchTags(tag){
    this.Posts$ = this.postsApi.getTagPosts(tag);
    this.search.emit(this.Posts$);
  }

  SearchTitles(SearchTitle){
    let searchtitle = SearchTitle.toLowerCase().trim();
    this.Posts$ = this.postsApi.getTitlePosts()
    .pipe(
      debounceTime(500),
      map(data=>data.filter((data:any)=>data.title.toLowerCase().includes(searchtitle)))
      )
    this.search.emit(this.Posts$);
  }

  refresh(){
    this.Posts$ = this.postsApi.getPosts();
    this.search.emit(this.Posts$);
  }
}
