import * as express from "express";

import {Server} from 'ws';



const app=express();

export class Product{
    constructor(
      public id:number,
      public title:string,
      public price:number,
      public rating:number,
      public desc:string,
      public categories:Array<string>
    ){}
} 
const products:Product[]=[
    new Product(1,"第一个商品",1.99,3,"这里添加商品描述介绍",["电子产品","硬件设备"]),
    new Product(2,"第二个商品",1.99,2,"这里添加商品描述介绍",["电子产品"]),
    new Product(3,"第三个商品",1.99,3,"这里添加商品描述介绍",["电子产品"]),
    new Product(4,"第四个商品",1.99,1,"这里添加商品描述介绍",["电子产品"]),
    new Product(5,"第五个商品",1.99,4,"这里添加商品描述介绍",["电子产品"]),
    new Product(6,"第六个商品",1.99,3,"这里添加商品描述介绍",["电子产品"]),
];

export class Comment{
    constructor(public id:number,
                public productId:number,
                public timestamp:string,
                public user:string,
                public rating:number,
                public content:string
    ){}
}
 
const comments:Comment[]=[
    new Comment(1,1,"2017-02-03 22:22:02","张三",3,"东西不错"),
    new Comment(2,1,"2017-03-03 21:22:02","李四",2,"东西不错"),
    new Comment(3,1,"2017-04-03 20:22:02","王大",4,"东西不错"),
    new Comment(4,2,"2017-05-03 22:22:02","赵二",3,"东西不错"),
    new Comment(5,3,"2017-05-03 22:22:02","孙五",1,"东西不错")
  ];

app.get('/',(req,res)=>{
    res.send("Hello Express 1");
});
app.get('/api/products',(req,res)=>{
    console.log("有一个客户端发来请求");
    let result=products;
    let params=req.query;
    console.log("URL:"+req.params.title);
    console.log("params:"+params);
    if(params.title){
        console.log("title 存在"+params.title);
        result=result.filter((p)=>p.title.indexOf(params.title)!==-1);
    }
    if(params.price && result.length>0){
        console.log("price 存在"+params.price);
        result=result.filter((p)=>p.price<=parseInt(params.price));
    }
    if(params.category!=="-1"&&result.length>0){
        console.log("category 存在"+params.category);
        result=result.filter((p)=>p.categories.indexOf(params.category)!==-1);
    }
    console.log("最终result:"+result);
    res.json(result);
});

app.get('/api/product/:id',(req,res)=>{
    res.json(products.find((product)=>product.id==req.params.id));
});

app.get('/api/product/:id/comments',(req,res)=>{
    res.json(comments.filter((comment:Comment)=>comment.productId==req.params.id));
});

const serve=app.listen(8000,"localhost",()=>{
    console.log("服务器已启动，地址是http://localhost:8000");
    console.log("ctrl+C退出服务！");
});

/* const wsServer=new Server ({port:8085});
wsServer.on("connection",websocket=>{
    websocket.send("这个消息是服务器推送的");
}) */
