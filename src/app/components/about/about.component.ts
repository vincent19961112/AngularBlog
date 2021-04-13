import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { lightSpeedIn, slideInDown } from 'ng-animate';
import { PostsService } from 'src/app/services/posts.service';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/models/post';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { AuthorsService } from '../../services/authors.service';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
   encapsulation:ViewEncapsulation.None,
  animations:[
    trigger('lightSpeedIn', [transition('* <=> *', useAnimation(lightSpeedIn))]),
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
  ]
})
export class AboutComponent implements OnInit {


  lightSpeedIn = false;
  slideInDown = false;

  @Output() post = new EventEmitter<Object>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource$: MatTableDataSource<Post>;
  Posts$: Observable<any>;
  TagPosts$: any;

  auth;
  posts = [];

  constructor(
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private postsApi:PostsService,
    private Auth:AuthorsService,
    private viewportScroller:ViewportScroller,
  ) { }

  ngOnInit(): void {
   this.viewportScroller.scrollToPosition([0,0])
   this.currentAuthStatus();
   this.getPrivatePost();
  }


  DeletePost(postId){
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
          height: '30vh',
          width: '30vw',
          data: { postId: postId }
        }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.posts = [];
      this.getPrivatePost();
    });
  }

  currentAuthStatus(){
    this.Auth.currentAuthStatus.subscribe(data=>{
      this.auth = data;
    })
  }

  getPrivatePost(){
    this.changeDetectorRef.detectChanges();
      this.postsApi.getPrivatePosts(this.auth.uid).subscribe(item=>{
        item.forEach(data=>{
          let post = data.data();
          post.postId = data.id;
          this.posts.push(post);
        })
          this.dataSource$ = new MatTableDataSource<Post>(this.posts);
          this.dataSource$.paginator = this.paginator;
          this.Posts$ = this.dataSource$.connect();
      })
  }

  ngOnDestroy(): void {
    if(this.dataSource$){
      this.dataSource$.disconnect();
    }
  }
}
