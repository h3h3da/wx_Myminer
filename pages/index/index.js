// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    general_info: {},
    hasUserInfo: false,
    inputValue: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    userAddress: wx.getStorageSync("userAddress"),
  },
  // 事件处理函数
  bindViewTap() {
  
    this.getGeneral_info()
    this.getPrice()
    this.getWorker()
    this.getHashrate()
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    this.getGeneral_info()
    this.getPrice()
    this.getWorker()
    this.getHashrate()
    var that = this
  },

  userAddressInput:function(e){
    this.setData({
      
    })
  },
  
  userAddressSearch:function(e){
    var that = this
    var getAddress=e.detail.value
    // checkUrl="https://api.nanopool.org/v1/cfx/accountexist"
    //wx.request用来发起向远程服务器的请求
    wx.request({
      //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
      url: 'https://api.nanopool.org/v1/cfx/accountexist/'+getAddress, 
      success: function(res) {
        // console.log("check result: ", res)
        if(res["data"]["status"]){
          wx.setStorageSync("userAddress", getAddress)
          // console.log("Store: ", wx.getStorageSync('userAddress'))
          that.setData({
            inputValue: ""
          })
          that.onLoad()
        }else{
          wx.showModal({
            title: "温馨提示", // 提示的标题
            content: "账户不存在，请输入正确的CFX钱包地址！", // 提示的内容
            showCancel: true, // 是否显示取消按钮，默认true
            cancelText: "取消", // 取消按钮的文字，最多4个字符
            cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
            confirmText: "确定", // 确认按钮的文字，最多4个字符
            confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
            success: function (res) {
                console.log("接口调用成功的回调函数");
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            },
            fail: function () {
                console.log("接口调用失败的回调函数");
            },
            complete: function () {
                console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
            }
          })
       
          that.setData({
            inputValue: ""
          })
        }
      }
    })
  },

  getGeneral_info: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    var that = this
    var address=wx.getStorageSync('userAddress')
    // console.log("check adr: ", address)
    // console.log("address: ", address)
    if(address){
      //wx.request用来发起向远程服务器的请求
      wx.request({
        //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
        url: 'https://api.nanopool.org/v1/cfx/user/'+address, 
        success: function(res) {
        
          //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定

          var url1 = 'https://api.nanopool.org/v1/cfx/approximated_earnings/' + res["data"]["data"]["hashrate"]
          // console.log(res)
          if(res["data"]["status"]){
            wx.request({
              url: url1,
              success: function(res) {
                console.log(res)
                if(res["data"]["status"]){
                  that.setData({
                    approximated_earnings: res["data"]["data"]["day"],
                  
                  })
                }else{
                  var zero = {"coins": 0, "yuan": 0}
                  that.setData({
                    
                    approximated_earnings: zero
                
                  })
                }
              }
            })
          }

          that.setData({
            general_info:res["data"],
            account: address,
            unconfirmed_balance: res["data"]["data"]["unconfirmed_balance"],
            balance: res["data"]["data"]["balance"],
            hashrate: res["data"]["data"]["hashrate"]
          })
        }
      })
    }else{
      // console.log("no data")
      var zero = {"coins": 0, "yuan": 0}
      that.setData({
        // general_info:res["data"],
        account: "待输入",
        unconfirmed_balance: 0,
        balance: 0,
        hashrate: 0,
        approximated_earnings: zero
      })
    }
    
  },

  getPrice: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this

    //wx.request用来发起向远程服务器的请求
    wx.request({
      //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
      url: 'https://api.nanopool.org/v1/cfx/prices', 
      success: function(res) {
        
        that.setData({
          price:res["data"]
        })
      }
    })
  },

  getWorker: function () {
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
          console.log(res["data"]["data"][0])
          //setData方法可以理解为React当中的setState方法，用来修改我们在开头定义的weather变量，你不能直接通过data.weather来修改，那样的操作会破坏数据绑定
          var won = 0
          var woff = 0
          var rating = 0
          for(var j = 0,len=res["data"]["data"].length; j < len; j++) {
            if(res["data"]["data"][j]["hashrate"]){
              won++
            }else{
              woff++
            }
            rating += res["data"]["data"][j]["rating"]
          }
          // console.log("on: ", won)
          // console.log("off: ", woff)
          // console.log("rating: ", rating)
          that.setData({
            workersOnline: won,
            workersOffline: woff,
            rating: rating
          })
        }
      })
    }else{
      that.setData({
        workersOnline: 0,
        workersOffline: 0,
        rating: 0
      })
    }
    
  },

  getHashrate: function () {
    //示例中有很多这样that = this的代码，但我发现最新的开发者工具是支持ES6的，你完全可以用autobinding一类的语法糖来避免这些冗余的绑定代码
    
    var that = this
    var address=wx.getStorageSync('userAddress')
    if(address){
      //wx.request用来发起向远程服务器的请求
      wx.request({
        //wx.request访问的远程网址必须是https，这里使用的是很棒的心知天气的API，可以免费注册
        url: 'https://api.nanopool.org/v1/cfx/avghashrate/'+address, 
        success: function(res) {
          
          that.setData({
            hashrate6:(res["data"]["data"]["h6"]).toFixed(2),
            hashrate24:(res["data"]["data"]["h24"]).toFixed(2)
          })
        }
      })
    }else{
      that.setData({
        hashrate6: 0,
        hashrate24: 0
      })
    }
    
  },


  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
