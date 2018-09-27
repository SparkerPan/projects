import { Injectable, EventEmitter} from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from"rxjs/operators";



@Injectable({
  providedIn: 'root'
})


@Injectable()
export class ProductService {
  searchEvent:EventEmitter<ProductSearchParams>=new EventEmitter();
  
  constructor(private http:Http) { }

  getAllCategories():string[]{
    return ["电子产品","电子产品","硬件设备","图书"]
  }

  getProducts():Observable<Product[]>{
    return this.http.get("/api/products").pipe(map(res=>res.json())) ;
  }

  getProduct(id:number):Observable<Product>{
    return this.http.get("/api/product/"+id).pipe(map(res=>res.json())) ;
  }

  getCommentsForProductId(id:number):Observable<Comment[]>{
    return this.http.get("/api/product/"+id+"/comments").pipe(map(res=>res.json())) ;//"/comments"的'/'
                                                                                      //不能少
    
  }
 
  search(params:ProductSearchParams ):Observable<Product[]>{
    return this.http.get("/api/products",{search:this.encodeParams(params)}).pipe(map(res=>res.json())) ;
    //console.log(this.encodeParams(params));return ;//{title:"第一个"}
    
  }

  /* private encodeParams(params:ProductSearchParams){
    let result={};

    result= Object.keys(params)
    .filter(key=>params[key]);
    return result;
  }  */
 
  private encodeParams(params:ProductSearchParams){
    let result:URLSearchParams;

    result= Object.keys(params)
    .filter(key=>params[key])
    .reduce((sum:URLSearchParams,key:string)=>{
      console.log(key,params[key]);
      sum.append(key,params[key]);
      return sum;
    },new URLSearchParams()); 
   // myurl.getAll("title");
    return result;
  } 

}

export class ProductSearchParams{
  constructor(public title:string,
              public price:number,
            public category:string){}
}


export class Product{
  constructor(
    public id:number,
    public title:string,
    public price:number,
    public rating:number,
    public desc:string,
    public cateqories:Array<string>
  ){}
}

export class Comment{
  constructor(public id:number,
              public productId:number,
              public timestamp:string,
              public user:string,
              public rating:number,
              public content:string
  ){}
}