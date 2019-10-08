const app = getApp();
const baseUrl = app.globalData.baseUrl;

Page({
  properties: {
    record_id: { //id
      type: Number
    },
    uuid:{
      type:String
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    images: {
      bg: baseUrl + '/images/xinxi/tu.png',
      topkuang: baseUrl + '/images/xinxi/jx1.png',
      explain: baseUrl + '/images/xinxi/explain.png',
      zhuyi: baseUrl + '/images/xinxi/jx5.png',
      btn: baseUrl + '/images/xinxi/kuangwenzi.png',
      xian: baseUrl + '/images/xinxi/jx2.png'
    },
    record_id:1,
    uuid:'asd',
  },
  
  formSubmit(e) {

    if (e.detail.value.name.length > 0 && e.detail.value.area.length > 0 && e.detail.value.phone.length > 0){
      console.log(e.detail.value);
      // wx.redirectTo({
      //   url: ''   //页面跳转
      // })
    wx.request({
      url: 'https://longmarch.innov-more.com/insertAwardMessage',
      data: {
        uuid: this.data.uuid,
        addresseephone: e.detail.value.phone,
        addressee: e.detail.value.name,
        address: e.detail.value.area,
        id: this.data.record_id
      },
      success: res=> {
        // console.log(res.data)
        const mask = this.selectComponent('#commit')

        mask.openMask()
        // wx.redirectTo({
        //   url: '../home/home'   //页面跳转
        // })
      }
    })
    }else{
      wx.showModal({
        title: '问题',
        content: '战友！请填写完整信息以方便把物资送抵',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uuid: options.uuid,
      record_id: options.record_id,
    })
    console.log(this.data.record_id)
    console.log(this.data.uuid)
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
  console.log('用户点击分享')
    return {
      title: '再走长征路',
      path: '/pages/login/login',
      imageUrl: 'https://longmarch.innov-more.com/images/guoye/startover.jpg', //加载页图
    }
  }
})