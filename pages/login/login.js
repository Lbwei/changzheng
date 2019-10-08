// pages/login/login.js
const app = getApp();
const baseUrl = app.globalData.baseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    token: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
 

  authorizeClick(e) {
    const userInfo = JSON.parse(e.detail.rawData)

    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })

      // 保存到app.js中
      app.globalData.userInfo = userInfo

      wx.setStorageSync('userInfo', userInfo)

      // 登录功能
      wx.login({
        success: res => {
          // 拿到code
          const code = res.code;

          wx.request({
            url: baseUrl + '/weChatLogin',
            method: 'get',
            data: {
              code,
              nickName: userInfo.nickName
            },
            success: res => {
             
              this.setData({
                token: res.data
              })
           
              wx.setStorageSync('token', this.data.token)

              wx.redirectTo({
                url: '../startover/startover',
              })
            }
          })
        },
        fail: err => {
          wx.showModal({
            title: '登录失败',
            content: '重试',
          })
        }
      })
    }
  },
   onShareAppMessage: function () {
    return {
      title: '再走长征路',
      path: '/pages/login/login',
      imageUrl: 'https://longmarch.innov-more.com/images/guoye/startover.jpg', //加载页图
    }
  }
})