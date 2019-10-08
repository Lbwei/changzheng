// components/tongguan.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    i: { //下标
      type: Number
    },
    challengeNum: {
      type: Number
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    cang:true,
    yinxing: false,
    tap: '',
    i: '',
    challengeNum: '',
    closeIcon: '../../images/huodongshuoming/icon.png',
    //奖项
    gameExplain: '',
    yiguan:'../../images/tongguan/tongguan1.png',
    erguan: '../../images/tongguan/tongguan2.png',
    sanguan: '../../images/tongguan/tongguan3.png',
    shibai: '../../images/tongguan/shibai.png',
    //按钮
    gamebtn: '',
    jixu: '../../images/tongguan/jixu.png',
    zaizhan: '../../images/tongguan/zaizhan.png',
    choujiang: '../../images/tongguan/choujiang.png',
    isShowMask: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openMask() {
      // console.log(this.data.i)
      if (this.data.i == 1) {
        this.setData({
          gameExplain: this.data.yiguan,
          gamebtn: this.data.jixu,
          tap: "guoguantap",
          cang: false,
        })
      } else if (this.data.i == 2) {
        this.setData({
          gameExplain: this.data.erguan,
          gamebtn: this.data.jixu,
          tap: "guoguantap",
          cang: false,
        })
      } else if (this.data.i == 3) {
        this.setData({
          gameExplain: this.data.sanguan,
          gamebtn: this.data.choujiang,
          tap: "choujiangtap",
          cang: false,
        })
      } else if (this.data.i == 4) {
        this.setData({
          gameExplain: this.data.shibai,
          gamebtn: this.data.zaizhan,
          tap: "xingyuntap",
          yinxing:true,
          cang:false,
        })
      }
      this.setData({
        isShowMask: true,
      })
    },

    closeMask() {
      this.setData({
        isShowMask: false,
        cang: false,
        yinxing: false,
      })
    },

    guoguantap() {
      console.log('恭喜过关')
      if (this.data.challengeNum == 1) {
        wx.redirectTo({
          url: '../insertedone/insertedone',
        })
      } else if (this.data.challengeNum == 2) {
        wx.redirectTo({
          url: '../insertedtwo/insertedtwo',
        })
      }
    }, 
    
    choujiangtap() {
      console.log('恭喜过关')
      wx.redirectTo({
        url: '../../pages/lottery/lottery',// 前往抽奖页
      })
    },
    // xingyuntap() {
    //   this.setData({
    //     tap: 'xingyuntapplus',
    //     yinxing:true,
    //     gameExplain: this.data.xingyunx,
    //     gamebtn: this.data.queren,
    //   })
    // },
    
  }
})

