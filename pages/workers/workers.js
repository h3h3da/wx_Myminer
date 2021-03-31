// pages/workers/workers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workers: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWorkers()
  },
  // 事件处理函数
  bindViewTap() {
    
    this.getWorkers()
  },
  getWorkers: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this
    var address=wx.getStorageSync('userAddress')
    if(address){
      //wx.request用来发起向远程服务器的请求
      wx.request({
        //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
        url: 'https://api.nanopool.org/v1/cfx/workers/'+address, 
        success: function(res) {
          console.log(res)
          console.log(res["data"]["data"])
          
          //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
          that.setData({
            workers:res["data"]["data"],
            total: res["data"]["data"].length
          })
        }
      })
    }else{
      that.setData({
        workers: [],
        total: 0
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