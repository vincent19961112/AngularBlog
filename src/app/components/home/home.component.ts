import { ViewportScroller } from '@angular/common';
import { transition, trigger, useAnimation } from '@angular/animations';
import {  Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { lightSpeedIn, slideInDown } from 'ng-animate';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
    encapsulation:ViewEncapsulation.None,
  animations:[
    trigger('lightSpeedIn', [transition('* <=> *', useAnimation(lightSpeedIn))]),
  ]
})
export class HomeComponent implements OnInit {

  spinnerScroll:number = 0;
  isScrolled = true;

  mode : ProgressSpinnerMode = 'determinate';
  color : ThemePalette = 'accent';

  @HostListener('window:scroll', ['$event']) onWindowScroll(e) {

    let scrollTop = e.target['scrollingElement'].scrollTop;
    let scrollHeight = e.target['scrollingElement'].scrollHeight;
    let clientHeight = e.target['scrollingElement'].clientHeight;

    this.spinnerScroll = Math.floor(scrollTop/(scrollHeight-clientHeight)*100);
    if(e.target['scrollingElement'].scrollTop>500){
      this.isScrolled = true;
    }else if(e.target['scrollingElement'].scrollTop<=500){
      this.isScrolled = false;
    }
  }

  tags$;
  lightSpeedIn = false;
  slideInDown = false;
  Posts$;
  position;

  constructor(private viewportScroller:ViewportScroller) { }

  ngOnInit(): void {
     this.viewportScroller.scrollToPosition([0,0]);
  }

  TagsSearchPosts(posts$){
    this.Posts$ = posts$;
  }

  goToTop(){
     this.viewportScroller.scrollToPosition([0,0]);
  }

}
