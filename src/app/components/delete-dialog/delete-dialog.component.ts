import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthorsService } from 'src/app/services/authors.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  success: boolean = false;
  auth;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private PostApi: PostsService,
    private viewportScroller:ViewportScroller,
    overlayContainer:OverlayContainer
    ) {
       overlayContainer.getContainerElement().classList.add('custom-theme-1');
    }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0,0])
    this.success = false;
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendDelete(postId){
    this.PostApi.deletePost(postId);
    this.success = true;
    setTimeout(() => {
        this.dialogRef.close();
    }, 1500);
  }
}
