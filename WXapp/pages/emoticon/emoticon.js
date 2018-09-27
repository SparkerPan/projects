//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    text: "",
    motto: 'Hello World',
    mywidth:0,
    myheight:0,
  },
  //事件处理函数
  onReady:function(){
   // console.log("宽度是：" + wx.getSystemInfoSync().windowWidth)
    this.setData({
      mywidth: wx.getSystemInfoSync().screenWidth,
      myheight: wx.getSystemInfoSync().windowHeight
    })
    //console.log("宽度是：" + this.data.mywidth)
  },
  review:function(e) {
    /*console.log("确认发起投票？")
    wx.navigateTo({
      url: '/pages/second/second'
    })
    */
    this.setData({
      text: e.detail.value
      
    })
  },

  save: function (e){
    var longth = this.data.text.length
    var context = wx.createCanvasContext('firstCanvas')
    context.drawImage("/card.jpg", 0, 0, this.data.mywidth, 270)
    context.setFontSize(20);
    var loca = this.data.mywidth / 2 - longth / 2 * 20  
    context.fillText(this.data.text, loca , 200)
    context.draw(false, function () {
      var imageTempPath
      wx.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        success: function (res) {
          // 获得图片临时路径
          imageTempPath = res.tempFilePath;
          console.log(imageTempPath) 
          wx.saveImageToPhotosAlbum({
            filePath: imageTempPath,
            success(res) {
              console.log(res.errMsg)
            },
            fail(res) {
              console.log(res.errMsg)
            }
          })        
        }
      })
    })
/**/
  }



})//这是最外层的括号
