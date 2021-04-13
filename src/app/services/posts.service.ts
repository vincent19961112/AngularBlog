import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  theme:string;
  currentTheme: string;

  constructor(private Afs:AngularFirestore) { }

  //抓取全部的文章
  getPosts():Observable<any[]>{
    return this.Afs.collection('Posts',ref=>ref.orderBy("createdAt", "desc")).valueChanges();
  }

  //抓取全部有tag的文章
  getTagPosts(tag):Observable<any>{
    return this.Afs.collection('Posts',ref=>ref.where('tags','array-contains',tag).orderBy("createdAt", "desc")).valueChanges();
  }
  //抓取全部表題文章
  getTitlePosts():Observable<any>{
    return this.Afs.collection('Posts').valueChanges();
  }
  //抓取個人所有文章
  getPrivatePosts(AuthId):Observable<any>{
     return this.Afs.collection('Posts',ref=>ref.where('AuthId','==',AuthId)).get();
  }

  //抓取個人文章
  getPrivatePost(Id){
    return this.Afs.collection('Posts').doc(Id).valueChanges();
  }

  //抓取單筆文章
  getPost(title):Observable<any>{
     return this.Afs.collection('Posts',ref=>ref.where('title','==',title)).valueChanges();
  }

  //新增文章
  addPost(newPost){
     this.Afs.collection('Posts').add(newPost);
  }

  //更新文章
  updatePost(postId,updatePost){
    this.Afs.collection('Posts').doc(postId).update(updatePost);
  }

  //刪除文章
  deletePost(postId){
    this.Afs.collection('Posts').doc(postId).delete();
  }

  //抓取全部的標籤名
  getTags():Observable<any>{
    return this.Afs.collection('Tags').doc('category').valueChanges();
  }

  //新增標籤名
  addTag(Tags){
    let InputTags = Tags;
    this.Afs.collection('Tags').doc('category').get().subscribe(data=>{
      if(!data.exists){
          this.Afs.collection('Tags').doc('category').set({tags:InputTags});
      }else{
          this.Afs.collection('Tags').doc('category').get().subscribe((ref:any)=>{
          let oldTags = ref.data();
          let oldtags = oldTags.tags;
          InputTags.forEach(tag=>{
          if(!oldtags.includes(tag)){
              oldtags.push(tag);
              this.Afs.collection('Tags').doc('category').update({tags:oldtags});
            }
          })
      });
      }
    })
  }

  private themeChangeSubject = new Subject<string>();
  //讀取樣式
  getTheme(){
    return this.themeChangeSubject.asObservable();
  }
  //傳送更改樣式
  sendThemeChange(theme){
    this.currentTheme = theme;
    console.log(this.currentTheme)
    this.themeChangeSubject.next(this.currentTheme);
  }



  private PostChangeSubject = new Subject<any>();
  //讀取更改文章
  getPostChange(){
    return this.PostChangeSubject.asObservable()
  }
  //傳送更改文章
  sendPostChange(post){
     this.PostChangeSubject.next(post);
  }

}
