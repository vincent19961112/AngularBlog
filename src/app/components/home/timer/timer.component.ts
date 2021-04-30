import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  TSSpinner: number = 0;
  TMSpinner: number = 0;
  THSpinner: number = 0;
  THdiameter: number = 100;
  TMdiameter: number = 200;
  TSdiameter: number = 300;
  THstrokeWidth: number = 10;
  TMstrokeWidth: number = 20;
  TSstrokeWidth: number = 25;
  colorH: ThemePalette = 'accent';
  colorM: ThemePalette = 'warn';
  colorS: ThemePalette = 'primary';
  mode : ProgressSpinnerMode = 'determinate';
  constructor() { }

  TH:number = new Date().getHours();
  TM:number = new Date().getMinutes();
  TS:number = new Date().getSeconds();
  TTH:string;
  TOH:string;
  TTM:string;
  TOM:string;
  TTS:string;
  TOS:string;

  ngOnInit(): void {
     setInterval(()=>{
        this.TSSpinner = this.TS/60*100;
        this.TMSpinner = this.TM/60*100;
        this.THSpinner = this.TH/24*100;
        this.TTH = Math.floor(this.TH/10).toString();
        this.TOH = Math.floor(this.TH%10).toString();
        this.TTM = Math.floor(this.TM/10).toString();
        this.TOM = Math.floor(this.TM%10).toString();
        this.TTS = Math.floor(this.TS/10).toString();
        this.TOS = Math.floor(this.TS%10).toString();

        this.TS = this.TS+ 1;
        if(Math.floor(this.TS%10)>=9){
        }
        if(this.TS>=60){
          this.TS = 0;
          this.TM = this.TM + 1;
        }
        if(Math.floor(this.TM%10)>=9){
        }
        if(this.TM>=60){
          this.TM = 0;
          this.TH = this.TH + 1;
        }
        if(Math.floor(this.TH%10)>=9){
        }
        if(this.TH>=24){
          this.TH = 0;
        }
    },1000);
  }

}
