import { PostsService } from './../../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {

  constructor(private postApi:PostsService){

  }
  chartTypeLine = 'line'
  chartTypeBar = 'bar';
  chartData = [];
  labels = [];
  chartOptions = {
  responsive: true
  };
  ngOnInit() {
    this.getChart();
  }
  selectTab(e){
    switch (e.tab.textLabel) {
      case '標籤':
        this.getChart()
        break;
      case '線圖':
        this.getChartLine()
        break;
      default:
        break;
    }
  }

  getChart(){
  this.labels = ['標籤']
  this.postApi.getPosts().subscribe((data)=>{
      let list = [];
      let result= [];
      let postTotal = [];
      let chartlist = [];
      data.forEach(item => {
       list.push(...item.tags)
      });
      result = [...new Set(list)]
      result.forEach((tag,index)=>{
        let Total = 0;
        data.forEach(item=>{
          if(item.tags.includes(tag)){
            Total++;
          }
        })
        postTotal[index] = Total;
      })
      result.forEach((item,index)=>{
        chartlist.push({data:[postTotal[index]],label:item})
      })
      this.chartData = chartlist
    })
  }

  getChartLine(){
  this.postApi.getPosts().subscribe(data=>{
    let dataResult = [];
    let year = []
    let CNmonths = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ]
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    let dataTime = [];
    let Distyear = [];
    let history = [];

    data.forEach(item=>{
      let TAD = new Date(Date.parse(item.createdAt.replace('上午','').replace('下午','')))
      let TY = TAD.toLocaleString("en-US", {year: "numeric"})
      let TM = TAD.toLocaleString("en-US", {month: "long"})
      history.push({month:TM,year:TY})
      year.push(TY)
      dataTime.push(TAD)
    })

    Distyear = [...new Set(year)]
    Distyear.forEach(item=>{
      let postTotal = [];
      months.forEach((data)=>{
        let number = 0;
        history.forEach(d=>{
          if(d.month == data && d.year == item){
            number++;
          }
        })
        postTotal.push(number)
      })
      dataResult.push({
        data: postTotal,
        label: item
      })
    })

  this.chartData = dataResult
  this.labels = CNmonths

  })
  }

}
