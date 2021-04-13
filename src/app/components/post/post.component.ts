import { PostsService } from 'src/app/services/posts.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../Post-dialog/Post-dialog.component';
import { transition, trigger, useAnimation } from '@angular/animations';
import { lightSpeedIn, slideInDown } from 'ng-animate';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Tags } from 'src/app/models/tags';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthorsService } from 'src/app/services/authors.service';
import { Subscription } from 'rxjs';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
   encapsulation:ViewEncapsulation.None,
  animations:[
    trigger('lightSpeedIn', [transition('* <=> *', useAnimation(lightSpeedIn))]),
    trigger('slideInDown', [transition('* <=> *', useAnimation(slideInDown))]),
  ]
})

export class PostComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  stylesQuill = {minHeight: '70vh',border:'5px solid black'}

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  Tags: Tags[] = [
    {name: '前端'},
    {name: '後端'},
    {name: '資料庫'},
  ];

  theme:string ='custom-theme-1';
  subscription: Subscription;
  lightSpeedIn = false;
  slideInDown = false;
  title:string;
  EditForm: FormGroup;
  EditContent:string;
  Content:string;
  description:string;
  createAt:string;
  updatedAt:string;
  panelOpenState = false;
  Auth;

  constructor(
    public dialog: MatDialog,
    private auth: AuthorsService,
    private viewportScroller:ViewportScroller,
    private postApi:PostsService
    ) { }

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0,0])
    this.EditForm = new FormGroup({
      'editor':new FormControl(this.EditContent)
    })

    this.auth.currentAuthStatus.subscribe(data=>{
     this.Auth = data
    })

    this.postApi.getTheme().subscribe(data=>this.theme = data)

  }

  Onsubmit(){
    this.EditContent = this.EditForm.get('editor').value;
  }

  openDialog(): void {
     this.createAt = new Date().toLocaleString();
     this.EditContent = this.EditForm.get('editor').value;
     let category = [];
     this.Tags.map(tag=>{
      category.push(tag.name)
     })
     const dialogRef = this.dialog.open(PostDialogComponent, {
      panelClass: this.theme,
      height: '80vh',
      width: '80vw',
      data: {
        title:this.title,
        description:this.description,
        name:(this.Auth.displayName!=null) ? this.Auth.displayName: '匿名',
        tags:category,
        createdAt:this.createAt,
        updatedAt:this.updatedAt ? null: '還未更新',
        content:`${this.EditContent}`,
        AuthId:this.Auth.uid,
        newPost:true
      }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

   add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.Tags.push({name: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }
  remove(Tag: Tags): void {
    const index = this.Tags.indexOf(Tag);
    if (index >= 0) {
      this.Tags.splice(index, 1);
    }
  }
//quill-edit的觸發事件內容檢查
  focus(e){
    console.log(e)
  }


  // changedEditor(e){
  //   console.log(e)
  // }

  // blur(e){
  //   console.log(e)
  // }

  // created(e){
  //   console.log(e)
  // }


}


