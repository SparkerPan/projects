import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../shared/product.service';
import { FormControl } from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { Observable } from 'rxjs';
/* import {pipe} from 'rxjs'  */


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products:Observable<Product[]>;
  

  constructor(private productService:ProductService) {
    /* this.titleFilter.valueChanges
    .pipe(debounceTime(500))//延迟搜索
    .subscribe(
      value=>this.keyword=value
    ); */
    
   }

  ngOnInit() {
    this.products=this.productService.getProducts();
    this.productService.searchEvent.subscribe(
      params=>this.products= this.productService.search(params)
    );
  }

}
