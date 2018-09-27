import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input()                              //接收父组件传递的值
  private rating:number=0;

  @Output()
  private ratingChange:EventEmitter<number>=new EventEmitter();

  private stars:boolean[];               //定义星星属性变量

  @Input() 
  private readonly:boolean=true;
  
  constructor() { }

  ngOnInit() {

    this.stars=[];//初始化星星变量true,true,true,false,false
    for(let i=1;i<=5;i++){
      this.stars.push(i>this.rating);
    }
  }
  clickStar(index:number){
    if(!this.readonly){
      this.rating=index+1;
      this.ngOnInit();
      this.ratingChange.emit(this.rating);
    }
  }

}
