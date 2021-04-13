import { Component, OnChanges, OnInit,OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from '../../../services/posts.service';
import { ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from '../../../models/post';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnChanges,OnDestroy {

  @Input() TagPosts$:Observable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource$: MatTableDataSource<Post>;
  Posts$: Observable<any>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private postsApi:PostsService
    ) { }

   ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.postsApi.getPosts().subscribe(post=>{
        this.dataSource$ = new MatTableDataSource<Post>(post);
        this.dataSource$.paginator = this.paginator;
        this.Posts$ = this.dataSource$.connect();
    })
  }
  ngOnChanges(): void {
    this.changeDetectorRef.detectChanges();
    this.TagPosts$.subscribe(post=>{
        this.dataSource$ = new MatTableDataSource<Post>(post);
        this.dataSource$.paginator = this.paginator;
        this.Posts$ = this.dataSource$.connect();
    })
  }

   ngOnDestroy(): void {
    if(this.dataSource$){
      this.dataSource$.disconnect();
    }
  }

  onPaginateChange($event) {
  console.log($event);
  }
}
