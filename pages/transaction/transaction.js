// pages/transaction/transaction.js
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
    this.getTransactions()
  },

  // 事件处理函数
  bindViewTap() {
      
    this.getTransactions()
  },
  getTransactions: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this
    var address=wx.getStorageSync('userAddress')
    if(address){
      //wx.request用来发起向远程服务器的请求
      wx.request({
        //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
        url: 'https://api.liucunzhan.com/transaction?limit=100&skip=0&accountAddress='+address, 
        success: function(res) {
          console.log(res)
          console.log(res["data"])
          
          for(var i=0;i<res["data"]["list"].length;i++){
            res["data"]["list"][i]["from"]=res["data"]["list"][i]["from"].toLowerCase().substr(0,4) + res["data"]["list"][i]["from"].toLowerCase().substr(-42,)
            res["data"]["list"][i]["to"]=res["data"]["list"][i]["to"].toLowerCase().substr(0,4) + res["data"]["list"][i]["to"].toLowerCase().substr(-42,)
            res["data"]["list"][i]["value"]=res["data"]["list"][i]["value"] / Math.pow(10, 18)
            res["data"]["list"][i]["number"]=i+1
          }
          //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
          that.setData({
            transactions:res["data"]["list"], 
            total: res["data"]["total"]
          })
        }
      })
    }else{
      that.setData({
        transactions: [],
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