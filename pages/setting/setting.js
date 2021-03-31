// pages/setting/setting.js

var app = getApp();
Page({

  actioncnt: function() {        
    wx.showActionSheet({            
      itemList:  ['群聊',  '好友',  '朋友圈'],
      success: function(res)  {
        console.log(res.tapIndex)
      },
      fail: function(res)  {
        console.log(res.errMsg)
      }
    })   
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  /**
   * 矿池列表
   */
  onPoolClick:function(event){
    wx.navigateTo({
      url: '/pages/mypool/mypool',
    })
  },
  /**
   * 我的矿机
   */
  onWorkerClick:function(event){
    wx.navigateTo({
      url: '/pages/workers/workers',
    })
  },
  /**
   * 转账记录
   */
  onAccountClick: function (event) {
    wx.navigateTo({
      url: '/pages/payments/payments',
    })
  },
  /**
   * 我的钱包
   */
  onWalletClick: function (event) {
    wx.navigateTo({
      url: '/pages/wallet/wallet',
    })
  },
  /**
   * 交易记录
   */
  onTransactionClick: function (event) {
    wx.navigateTo({
      url: '/pages/transaction/transaction',
    })
  },
  /**
   * 帮助中心
   */
  onHelpClick: function (event) {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  /**
   * 关于我们
   */
  onAboutClick: function (event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  }
})

