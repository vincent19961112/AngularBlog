import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import auth from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  currentUser = new BehaviorSubject<any>(null);
  errorMessage;
   constructor(
     public AfAuth:AngularFireAuth,
     private router:Router
     ) {
       this.authStatusListener();
    }


  private authStatusSub = new BehaviorSubject(this.currentUser);
  currentAuthStatus = this.authStatusSub.asObservable();


    authStatusListener(){
      this.AfAuth.onAuthStateChanged((credential:any)=>{
        if(credential){
          this.authStatusSub.next(credential);
          console.log('User is logged in');
        }
        else{
          this.authStatusSub.next(null);
          console.log('User is logged out');
        }
      })
    }

    //註冊帳號
    signUp(email,password){
      this.AfAuth.createUserWithEmailAndPassword(email,password)
      .then(()=>{
        console.log('註冊成功');
        this.router.navigate(['/signIn'])
      })
      .catch(err=>{
        console.log(err)
      })
    }
    //登入
    signIn(email,password){
    this.AfAuth.signInWithEmailAndPassword(email,password)
    .then(()=>{
      this.router.navigate(['home']);
    })
    .catch(err=>{
      this.errorMessage = err.message;
    })
    }
    //登出
    signOut(){
      this.AfAuth.signOut()
      .then(()=>{
        console.log('登出成功')
      }).catch((err)=>{
        console.log(err);
      })
    }
    //
    sendEmailVerification(email,ActionCodeSettings) {
    this.AfAuth.sendSignInLinkToEmail(email,ActionCodeSettings)
    this.router.navigate(['admin/verify-email']);
    }

    //google 登入
    GoogleSign(){
      this.AfAuth.signInWithPopup(new auth.auth.GoogleAuthProvider())
      .then(()=>{
         console.log('google 登入');
         this.router.navigate(['home'])
      })
      .catch((error)=>{
         console.log('error:',error);``
      })
    }



}
