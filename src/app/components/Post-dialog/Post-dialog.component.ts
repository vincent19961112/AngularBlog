import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { AuthorsService } from 'src/app/services/authors.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-Post-dialog',
  templateUrl: './Post-dialog.component.html',
  styleUrls: ['./Post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  success: boolean = false;
  theme: string = 'custom-theme-1';
  auth;

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private PostApi: PostsService,
    private router:Router,
    private AuthApi:AuthorsService,
    private viewportScroller:ViewportScroller
    ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0,0])
    this.success = false;
    this.AuthApi.currentAuthStatus.subscribe(data=>{
      this.auth = data;
    })

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendPost(){
    if(this.data.newPost){
      this.PostApi.addPost(this.data);
      this.success = true;
      setTimeout(() => {
          this.dialogRef.close();
          this.router.navigate(['/home']);
      }, 1500);
    }else{
      this.PostApi.updatePost(this.data.postId,this.data);
      this.success = true;
      setTimeout(() => {
          this.dialogRef.close();
          this.router.navigate(['/home']);
      }, 1500);
    }
  }
}
