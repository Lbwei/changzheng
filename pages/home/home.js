// pages/home/home.js
const app = getApp()
const baseUrl = app.globalData.baseUrl;
const TOKEN = 'token'
// app.globalData.token

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {
      bg: '../../images/home/bg.png',
      longMarch: baseUrl + '/images/home/title.png',
      line: baseUrl + '/images/home/line.png',
      zhText: baseUrl + '/images/home/zhtext.png',
      heros: baseUrl + '/images/home/heros.png',
      date: baseUrl + '/images/home/date.png',
      explain: baseUrl + '/images/home/explain.png',
      start: baseUrl + '/images/home/start.png',
      stars: baseUrl + '/images/home/stars.png',
      bottomText:  baseUrl + '/images/home/bottomtext.png',
      gifts:  '../../images/home/gifts.png',
      startover: baseUrl + '/images/guoye/startover.jpg',
      lottery: '../../images/home/lottery.png',
      cover: '../../images/home/tu2.png',
      play: '../../images/home/bf.png',
      clear:false,
    },
    videoSrc: 'https://boot-video.xuexi.cn/video/1004/p/2a6df0fe6dde33dac15e830a626e658b-9bcd7da7a9664bdfacb0ccca6ee8f05a-2.mp4',
    isShowMask: false,
    opacity: '',
    diabled: '',
    tab_image: 'block',
  },
  openMaskd: function () {

    this.selectComponent(".lipin").openMask();
    this.setData({
      clear:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  showvideo:function(e){
    console.log("asdhasusdhdasdhasiudahisuhd")
   this.setData({
     clear: true
   })
  },
  onLoad: function (options) { 
   
    const token = wx.getStorageSync('token')
    console.log(token)
    wx.request({
      url:'https://longmarch.innov-more.com/getCheckPointVCByUUID',
      data: {
        uuid: token
      },
      success: res => {
        console.log(res)
        if (res.data.score.state == 0) {
            this.setData({
            disable: 'none',
          })
        }
      }
    })
     /*score丢失 */
    /*预加载*/ 
  },
  videoPlay: function (e) {
    
    console.log('点击播放');
    console.log(e);
    //隐藏封面图和播放图标
    this.setData({
      tab_image: "none",  
      clear: true,  //tab_image 来控制封面图 
    }),
      this.videoCtx.play();
  },
  onReady() {
    this.videoCtx = wx.createVideoContext('myVideo')  //根据id绑定
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

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
    return {
      title: '再走长征路',
      path: '/pages/login/login',
      imageUrl: 'https://longmarch.innov-more.com/images/guoye/startover.jpg', //加载页图
    }
  },

  showMask() {
    const mask = this.selectComponent('#mask')
    this.setData({
      clear:false
    })
    // mask.setData({
    //   isShowMask: true
    // })
    
    mask.openMask()
  
  },
  onMyEvent: function (e) {
    //通过事件接收
    this.setData({
      clear: e.detail.clear
    })
  },
  onMyEvent: function (e) {
    //通过事件接收
    this.setData({
      clear: e.detail.clear
    })
  },
  startNow() {
    wx.navigateTo({
      url: '../customspass/customspass',
    })
  },

  toLottery() {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  }
})