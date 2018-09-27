import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Params} from "@angular/router";//自己导入的路由注入器
import { Product, ProductService, Comment } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product:Product;
  comments:Comment[];
  newRating:number=5;
  newComment:string="";

  isCommentHidden= true;

  isWatched:boolean=false;//关注标签
  currentBid:number;//最新报价

  constructor(private routeInfo: ActivatedRoute,
              private productService:ProductService
  ) { }

  ngOnInit() {
    let productId:number=this.routeInfo.snapshot.params["productId"];
    this.productService.getProduct(productId).subscribe(//手工订阅数据流subscribe方法
      product=>{this.product=product;
      this.currentBid=product.price//默认的商品价格为当前商品报价
      }
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments=>this.comments=comments
    );
  }
  addComment(){
    let comment=new Comment(0,
                            this.product.id,
                            new Date().toDateString(),
                            "匿名评价",
                            this.newRating,this.newComment);
    this.comments.unshift(comment);
    this.newComment=null;
    this.newRating=5;
    this.isCommentHidden=true;
  }

  watchProduct(){
    this.isWatched=!this.isWatched;
  }

}
