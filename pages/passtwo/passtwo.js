// pages/passtwo/passtwo.js

const app = getApp();
const baseUrl = app.globalData.baseUrl;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {
      bgOne: baseUrl + '/images/guoye/passtwo.jpg',
      text: '../../images/passone/twotext.png',
      jump: '../../images/passone/wenzi.png',
    },
    isTextShow: false,
    animationData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var attentionAnim = wx.createAnimation({
      duration: 150,
      timingFunction: 'ease',
      delay: 0
    })
    //设置循环动画
    this.attentionAnim = attentionAnim
    var next = true;
    setInterval(function () {
      if (next) {
        //根据需求实现相应的动画
        this.attentionAnim.rotate(3).step()
        next = !next;
      } else {
        this.attentionAnim.rotate(-3).step()
        next = !next;
      }
      this.setData({
        //导出动画到指定控件animation属性
        animationData: attentionAnim.export()
      })
    }.bind(this), 150)
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

  },

  btnClick() {
    this.setData({
      isTextShow: true
    })
  },

  bgClick() {
    this.setData({
      isTextShow: false
    })
  },

  jumpClick() {
    wx.redirectTo({
      url: '../subject/subject?challengeNum=2',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '再走长征路',
      path: '/pages/login/login',
      imageUrl: 'https://longmarch.innov-more.com/images/guoye/startover.jpg', //加载页图
    }
  }
})