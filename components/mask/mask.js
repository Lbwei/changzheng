// components/mask/mask.js

const app = getApp()

const baseUrl = app.globalData.baseUrl

Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    images: {
      gameExplain: '../../images/huodongshuoming/tu.png',
      closeIcon: '../../images/huodongshuoming/icon.png',
      hd: baseUrl + '/images/hd/hd.png'
    },
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
      this.triggerEvent('parentEvent', {}, {});
      this.setData({
        isShowMask: false
      })
    }
  }
})
