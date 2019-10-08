// components/commit/commit.js

const app = getApp()
const baseUrl = app.globalData.baseUrl

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    commit: baseUrl + '/images/lipin/commit.png',
    close: '../../images/huodongshuoming/icon.png',
    isShowMask: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openMask() {
      this.setData({
        isShowMask: true
      })
    },

    closeMask() {
      this.setData({
        isShowMask: false
      })

      wx.redirectTo({
        url: '../home/home',
      })
    }
  }
})
