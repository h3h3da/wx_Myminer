// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWallet()
  },

  // 事件处理函数
  bindViewTap() {
    this.getWallet()
  },

  getWallet: function () {
    var that = this
    var address=wx.getStorageSync('userAddress')
    //wx.request用来发起向远程服务器的请求
    wx.request({
      //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
      url: 'https://api.nanopool.org/v1/cfx/prices', 
      success: function(res) {
        that.data.price = res["data"]["data"]["price_cny"]
      }
    })


    if(address){
      //wx.request用来发起向远程服务器的请求
      wx.request({
        //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
        url: 'https://api.liucunzhan.com/account?account='+address, 
        success: function(res) {
          console.log(res)
          // console.log(res["data"]["data"])
          
          //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定

          that.setData({
            account: address,
            accountNew: res["data"]["address"].toLowerCase().substr(0,4) + res["data"]["address"].toLowerCase().substr(-42,),
            balance: res["data"]["balance"] / Math.pow(10, 18),
            collateralForStorage: res["data"]["collateralForStorage"]  / Math.pow(10, 18),
            nonce: res["data"]["nonce"],
            stakingBalance: res["data"]["stakingBalance"]  / Math.pow(10, 18),
            codeHash: res["data"]["codeHash"],
            admin: res["data"]["admin"],
            accumulatedInterestReturn: res['data']['accumulatedInterestReturn'],
            approximatedValue: (res["data"]["balance"] / Math.pow(10, 18) * that.data.price).toFixed(2)
          })
        }
      })
    }else{
      that.setData({
        account: "待输入",
        accountNew: "输入钱包地址后可查询",
        balance: 0,
        collateralForStorage: 0,
        nonce: 0,
        stakingBalance: 0,
        codeHash: 0,
        admin: 0,
        accumulatedInterestReturn: 0,
        approximatedValue: 0
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