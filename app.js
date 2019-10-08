const TOKEN = 'token'

//app.js
App({
  // 定义全局变量
  globalData: {
    userInfo: null,
    token: '',
    baseUrl: 'https://longmarch.innov-more.com',
    imgUrl: ''
  },

  onLaunch: function() {
    this.globalData.userInfo = wx.getStorageSync('userInfo')
    console.log(this.globalData.userInfo)
    const token = wx.getStorageSync(TOKEN);
    console.log(token)
    if (token.length !== 0) {


      // wx.reLaunch({
      //   url: 'pages/home/home'
      // })
    
    }
    
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     // code 只有5分钟有效
    //     // console.log(res)
    //     // console.log(res.code)

    //     // wx.getSetting({
    //     //   success: res => {
    //     //     if (res.authSetting['scope.userInfo']) {
    //     //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //     //       wx.getUserInfo({
    //     //         success: res => {
    //     //           // 可以将 res 发送给后台解码出 unionId
    //     //           this.globalData.userInfo = res.userInfo

    //     //           console.log(this.globalData.userInfo)

    //     //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //     //           // 所以此处加入 callback 以防止这种情况
    //     //           if (this.userInfoReadyCallback) {
    //     //             this.userInfoReadyCallback(res)
    //     //           }
    //     //         }
    //     //       })
    //     //     }
    //     //   }
    //     // })

    //     // 1.获取code
    //     const code = res.code;

    //     // 2.将code发送给服务器
    //     wx.request({
    //       url: 'http://172.16.0.145:8080/weChatLogin',
    //       method: 'get',
    //       data: {
    //         code,
    //         nickName: 'qzY'
    //       },
    //       success: res => {
    //         // 1.取出token
    //         const token = res.data;
    //         console.log(token)
    //         // 2.将token保存在globalData中
    //         this.globalData.token = token;

    //         // console.log(this.globalData.token)

    //         // 3.本地存储
    //         wx.setStorageSync(TOKEN, token)
    //       }
    //     })
    //   }
    // })

    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // console.log(this.globalData.userInfo)

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  }
})