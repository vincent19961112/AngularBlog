import { Component, OnInit,ViewChild } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { ActivatedRoute } from '@angular/router';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { ViewportScroller } from '@angular/common';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  titleheader;
  post$;
  @ViewChild(MatCard) card: MatCardTitle;

  constructor(
    private PostApi:PostsService,
    private route:ActivatedRoute,
    private viewportScroller: ViewportScroller,
    ) { }

  ngOnInit(): void {
     this.viewportScroller.scrollToPosition([0,0]);
    let title = this.route.snapshot.paramMap.get('id');
    this.PostApi.getPost(title).subscribe(post=>{
        this.post$ = post;
    });
    this.titleheader = this.card;
  }

  top(){
   this.viewportScroller.scrollToPosition([0,0]);
  }

}
