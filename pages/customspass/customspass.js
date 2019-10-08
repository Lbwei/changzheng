// pages/customspass/customspass.js
const app = getApp();
const baseUrl = app.globalData.baseUrl;
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {
      bg: baseUrl + '/images/customspass/bg.png',
      lock: baseUrl + '/images/customspass/lock.png',
      maskOne: baseUrl + '/images/customspass/mask1.png',
      maskTwo: baseUrl + '/images/customspass/mask2.png',
      back: "../../images/lottery/back.png"
    },
    socre1: 10,
    socre2: null,
    isSecondMaskShow: true,
    isThirdMaskShow: true,
    disabled: '',
    p:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getScore()
    console.log('onLoad')

    // console.log(this.score1)
    // console.log(this.score2)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {



  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const d=new Date;
    const p=d.getTime();
  
    this.setData({
     p:p,
    })
   
    console.log('onShow')
    if (this.data.p - this.data.g > 3000) {
      const token = wx.getStorageSync('token')
      wx.request({
        url: baseUrl + '/addAnswertimes',
        data: {
          uuid: token,
        
        },
        success: res => {
          console.log("分享成功")
        }
      })
      wx.request({
        url: baseUrl + '/selectDrawtimesByuuid',
        data: {
          uuid: token
        },
        success: res => {
          console.log(res)
          wx.redirectTo({
            url: '/pages/customspass/customspass',
          })
        }
      })
    }
  },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log('---')
  },

  threeClick() {
    wx.redirectTo({
      url: '../passthree/passthree'
    })
  },

  twoClick() {
    wx.redirectTo({
      url: '../passtwo/passtwo'
    })
  },

  oneClick() {
    wx.redirectTo({
      url: '../passone/passone'
    })
  },

  getScore() {

    const token = wx.getStorageSync('token')
    console.log(token)
    wx.request({
      url: baseUrl + '/getCheckPointVCByUUID',
      data: {
        uuid: token
      },
      success: res => {
        console.log(res.data)
        if (res.data.score) {
          this.setData({
            score1: res.data.score.score1,
            score2: res.data.score.score2
          })

          console.log(this.data.score1)
          console.log(this.data.score2)
          if (this.data.score1 >= 2) {
            this.setData({
              isSecondMaskShow: false
            })
          }

          if (this.data.score2 >= 3) {
            this.setData({
              isThirdMaskShow: false
            })
          }

          if (res.data.answertimes == 0) {
            wx.showModal({
              title: '遭遇埋伏',
              content: '没有次数了，快点击右上角分享，呼叫队友前来帮助！',
            })
            this.setData({
              disabled: 'none'
            })
          }
        }

      }
    })
  },


  onShareAppMessage: function() {
    const d = new Date;
    const p = d.getTime();

    this.setData({
      g: p,
    })

  
     
     
  
    return {
      title: '再走长征路',
      path: '/pages/login/login',
      imageUrl: 'https://longmarch.innov-more.com/images/guoye/startover.jpg', //加载页图
    }
  },

  blackClick() {
    wx.redirectTo({
      url: '../home/home',
    })
  }
})