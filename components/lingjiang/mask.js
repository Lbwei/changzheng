// components/mask/mask.js
const TOKEN = 'token'
var util = require("../../utils/util.js");
var app = getApp();
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
    record_id: { //id
      type: Number
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    value: null,
    yinxing: false,
    tap: '',
    i: '',
    record_id:100,
    cang: false,
    closeIcon: '../../images/huodongshuoming/icon.png',
    //奖项
    gameExplain: '',
    yideng: '../../images/lingjiang/yideng.png',
    erdeng: '../../images/lingjiang/erdeng.png',
    sandeng: '../../images/lingjiang/sandeng.png',
    xingyun: '../../images/lingjiang/xingyun.png',
    meizhong: '../../images/lingjiang/meizhong.png',
    xingyunx: '../../images/lingjiang/xingyunx.png',
    luru: '../../images/lingjiang/luru.png',
    //按钮
    gamebtn: '',
    lingqu: '../../images/lingjiang/lingqu.png',
    zaizhan: '../../images/lingjiang/zaizhan.png',
    queren: '../../images/lingjiang/queren.png',
    zaici: '../../images/lingjiang/zaici.png',
    isShowMask: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openMask() {
      console.log(this.data.i)
      if (this.data.i == 0) {
        this.setData({
          gameExplain: this.data.yideng,
          gamebtn: this.data.lingqu,
          tap: "youjiangtap",
        })
      } else if (this.data.i == 8) {
        this.setData({
          gameExplain: this.data.erdeng,
          gamebtn: this.data.lingqu,
          tap: "youjiangtap",
        })
      } else if (this.data.i == 4) {
        this.setData({
          gameExplain: this.data.sandeng,
          gamebtn: this.data.lingqu,
          tap: "youjiangtap",
        })
      } else if (this.data.i == 1 || this.data.i == 2 || this.data.i == 5 || this.data.i == 6 || this.data.i == 10 || this.data.i == 11) {
        this.setData({
          gameExplain: this.data.xingyun,
          gamebtn: this.data.lingqu,
          tap: "xingyuntap",
        })
      } else if (this.data.i == 7 || this.data.i == 3 || this.data.i == 9) {
        this.setData({
          gameExplain: this.data.meizhong,
          gamebtn: this.data.zaici,
          yinxing: true,
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

    youjiangtap() {
      console.log('中大奖啦')
      wx.redirectTo({
        url: "../xinxi/xinxi?record_id="+this.data.record_id+"&uuid="+wx.getStorageSync('token'), //前去信息填写页面
      })
    },
    adInputChange: function(e) {
      console.log(e)
      let that = this;
      that.setData({
        value: e.detail.value,
      })

    },
    xingyuntap() {
      this.setData({
        tap: 'xingyuntapplus',
        cang: true,
        gameExplain: this.data.xingyunx,
        gamebtn: this.data.queren,
      })
    },
    xingyuntapplus() {
      //将该值传给后台
      const token = wx.getStorageSync('token')
      const phoneNumber = this.data.value
      const record_id = this.data.record_id
      console.log(token)
      console.log(phoneNumber)
      console.log(record_id)
      if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
        console.log("手机号码有误，请重填");
        return false;
      } else{
        wx.request({
          url: 'https://longmarch.innov-more.com/luckyPhoneNumber',
          data: {
            uuid: token,
            luckyNum: phoneNumber,
            id: record_id
          },
          success: res => {
            console.log('发送成功')
          }
        })
        this.setData({
          tap: 'fenxiangtap',
          cang: false,
          gameExplain: this.data.luru,
          gamebtn: this.data.zaici,
          yinxing: true,
        })
      }
     
    },


  }
})