"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var Product = /** @class */ (function () {
    function Product(id, title, price, rating, desc, categories) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Product;
}());
exports.Product = Product;
var products = [
    new Product(1, "第一个商品", 1.99, 3, "这里添加商品描述介绍", ["电子产品", "硬件设备"]),
    new Product(2, "第二个商品", 1.99, 2, "这里添加商品描述介绍", ["电子产品"]),
    new Product(3, "第三个商品", 1.99, 3, "这里添加商品描述介绍", ["电子产品"]),
    new Product(4, "第四个商品", 1.99, 1, "这里添加商品描述介绍", ["电子产品"]),
    new Product(5, "第五个商品", 1.99, 4, "这里添加商品描述介绍", ["电子产品"]),
    new Product(6, "第六个商品", 1.99, 3, "这里添加商品描述介绍", ["电子产品"]),
];
var Comment = /** @class */ (function () {
    function Comment(id, productId, timestamp, user, rating, content) {
        this.id = id;
        this.productId = productId;
        this.timestamp = timestamp;
        this.user = user;
        this.rating = rating;
        this.content = content;
    }
    return Comment;
}());
exports.Comment = Comment;
var comments = [
    new Comment(1, 1, "2017-02-03 22:22:02", "张三", 3, "东西不错"),
    new Comment(2, 1, "2017-03-03 21:22:02", "李四", 2, "东西不错"),
    new Comment(3, 1, "2017-04-03 20:22:02", "王大", 4, "东西不错"),
    new Comment(4, 2, "2017-05-03 22:22:02", "赵二", 3, "东西不错"),
    new Comment(5, 3, "2017-05-03 22:22:02", "孙五", 1, "东西不错")
];
app.get('/', function (req, res) {
    //res.send("Hello Express 1");
    res.send(products);
});
app.get('/api/products', function (req, res) {
    console.log("有一个客户端发来请求");
    var result = products;
    var params = req.query;
    console.log("URL:" + req.params.title);
    console.log("params:" + params);
    if (params.title) {
        console.log("title 存在" + params.title);
        result = result.filter(function (p) { return p.title.indexOf(params.title) !== -1; });
    }
    if (params.price && result.length > 0) {
        console.log("price 存在" + params.price);
        result = result.filter(function (p) { return p.price <= parseInt(params.price); });
    }
    if (params.category !== "-1" && result.length > 0) {
        console.log("category 存在" + params.category);
        result = result.filter(function (p) { return p.categories.indexOf(params.category) !== -1; });
    }
    console.log("最终result:" + result);
    res.json(result);
});
app.get('/api/product/:id', function (req, res) {
    res.json(products.find(function (product) { return product.id == req.params.id; }));
});
app.get('/api/product/:id/comments', function (req, res) {
    res.json(comments.filter(function (comment) { return comment.productId == req.params.id; }));
});
var serve = app.listen(8000, "localhost", function () {
    console.log("服务器已启动，地址是http://localhost:8000");
    console.log("ctrl+C退出服务！");
});
/* const wsServer=new Server ({port:8085});
wsServer.on("connection",websocket=>{
    websocket.send("这个消息是服务器推送的");
}) */
