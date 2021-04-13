import { AuthorsService } from './../../services/authors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signIn = false;
  model:any = {};
  errorMessage;

  constructor(private ApiAuthor:AuthorsService) { }


  ngOnInit(): void {
    // this.ApiAuthor.Author
  }

  SignIn(email,password){
   this.errorMessage = this.ApiAuthor.signIn(email,password);
  }

  SignWithGoogle(){
    this.ApiAuthor.GoogleSign();
  }

  SignUp(email,password){
   this.ApiAuthor.signUp(email,password);
  }
  onSubmit(){
    console.log(this.model)
  }

}
