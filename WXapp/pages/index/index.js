// pages/index/index.js
Page({
  data: {
    mywidth: wx.getSystemInfoSync().screenWidth,
    myheight: wx.getSystemInfoSync().windowHeight
  },
  onLoad: function (options) {
 
  },
  emoticon:function(){
    wx.navigateTo({
      url: '/pages/emoticon/emoticon'
    })
  },
  calculate: function () {
    wx.navigateTo({
      url: '/pages/emoticon/emoticon'
    })
  },
  voter: function () {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },
  lucky: function () {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  },
  coolalbum : function () {
    wx.navigateTo({
      url: '/pages/logs/logs'
    })
  }
  
})

