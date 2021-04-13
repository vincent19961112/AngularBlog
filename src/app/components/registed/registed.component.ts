import { Component, OnInit } from '@angular/core';
import { AuthorsService } from 'src/app/services/authors.service';
@Component({
  selector: 'app-registed',
  templateUrl: './registed.component.html',
  styleUrls: ['./registed.component.scss']
})
export class RegistedComponent implements OnInit {

  model:any = {};

  constructor(
    private ApiAuthor:AuthorsService,
   ) { }

  ngOnInit(): void {
  }

   onSubmit() {
    this.ApiAuthor.signUp(this.model.email,this.model.password);
  }
}
