// pages/mypool/mypool.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActiveworkers(),
    this.getActiveminers()
    this.getHashrate(),
    this.getPrice(),
    this.getUsersettings()
  },

  // 事件处理函数
  bindViewTap() {
    
    this.getActiveworkers(),
    this.getActiveminers()
    this.getHashrate(),
    this.getPrice(),
    this.getUsersettings()
  },
  getActiveworkers: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this

    //wx.request用来发起向远程服务器的请求
    wx.request({
      //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
      url: 'https://api.nanopool.org/v1/cfx/pool/activeworkers', 
      success: function(res) {
        console.log(res)
        console.log(res["data"]["data"])
        
        //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
        that.setData({
          activeworkers:res["data"]["data"]
        })
      }
    })
  },

  getActiveminers: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this

    //wx.request用来发起向远程服务器的请求
    wx.request({
      //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
      url: 'https://api.nanopool.org/v1/cfx/pool/activeminers', 
      success: function(res) {
        console.log(res)
        console.log(res["data"]["data"])
        
        //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
        that.setData({
          activeminers:res["data"]["data"]
        })
      }
    })
  },

  getHashrate: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this

    //wx.request用来发起向远程服务器的请求
    wx.request({
      //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
      url: 'https://api.nanopool.org/v1/cfx/pool/hashrate', 
      success: function(res) {
        console.log(res)
        console.log(res["data"]["data"])
        
        //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
        that.setData({
          hashrate:(res["data"]["data"] / 1024).toFixed(2)
        })
      }
    })
  },

  getPrice: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this

    //wx.request用来发起向远程服务器的请求
    wx.request({
      //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
      url: 'https://api.nanopool.org/v1/cfx/prices', 
      success: function(res) {
        console.log(res)
        console.log(res["data"]["data"])
        
        //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
        that.setData({
          prices:res["data"]["data"]
        })
      }
    })
  },

  getUsersettings: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this
    var address=wx.getStorageSync('userAddress')
    if(address){
      //wx.request用来发起向远程服务器的请求
      wx.request({
        //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
        url: 'https://api.nanopool.org/v1/cfx/usersettings/'+address, 
        success: function(res) {
          console.log(res)
          console.log(res["data"]["data"])
          
          //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
          that.setData({
            payout:res["data"]["data"]["payout"]
          })
        }
      })
    }else{
      that.setData({
        payout: "输入钱包地址后可查询"
      })
    }
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})