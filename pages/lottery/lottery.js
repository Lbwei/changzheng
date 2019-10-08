var util = require("../../utils/util.js");
const app = getApp();
const baseUrl = app.globalData.baseUrl;

Page({


  //奖品配置
  awardsConfig: {
    chance: true,

    awards: [{
        'index': 0,
        'name': '一等奖'
      },
      {
        'index': 1,
        'name': '幸运奖'
      },
      {
        'index': 2,
        'name': '幸运奖'
      },
      {
        'index': 3,
        'name': '攒着手气'
      },
      {
        'index': 4,
        'name': '三等奖'
      },
      {
        'index': 5,
        'name': '幸运奖'
      },
      {
        'index': 6,
        'name': '幸运奖'
      },
      {
        'index': 7,
        'name': '再接再厉'
      },
      {
        'index': 8,
        'name': '二等奖'
      },
      {
        'index': 9,
        'name': '道阻且长'
      },
      {
        'index': 10,
        'name': '幸运奖'
      },
      {
        'index': 11,
        'name': '幸运奖'
      }
    ]
  },

  data: {
    images: {
      bg: baseUrl + '/images/lottery/bg.jpg',
      circle: baseUrl + '/images/lottery/circle.png',
      btn: baseUrl + '/images/lottery/btn.png',
      circleBottom: baseUrl + '/images/lottery/circlebottom.png',
      explainText: baseUrl + '/images/lottery/lotteryexplain.png',
      back: '../../images/lottery/back.png'
    },
    zhong: '',
    awardsList: {},
    animationData: {},
    btnDisabled: '',
    counters: 1,
    i: 3,
    disable: '',
    record_id: 1,
    drawstate: 0,
  },


  onReady: function(e) {

  },
  onShow: function() {
    const d = new Date;
    const p = d.getTime();

    this.setData({
      p: p,
    })

    console.log('onShow')
    if (this.data.p - this.data.g > 3000) {
      const token = wx.getStorageSync('token')
      wx.request({
        url: baseUrl + '/addDrawtimes',
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
            url: '/pages/lottery/lottery',
          })
        }
      })
    }
  },
  onLoad: function() {
    // var attentionAnim = wx.createAnimation({
    //   duration: 150,
    //   timingFunction: 'ease',
    //   delay: 0
    // })
    // //设置循环动画
    // this.attentionAnim = attentionAnim
    // var next = true;
    // setInterval(function () {
    //   if (next) {
    //     //根据需求实现相应的动画
    //     this.attentionAnim.rotate(3).step()
    //     next = !next;
    //   } else {
    //     this.attentionAnim.rotate(-3).step()
    //     next = !next;
    //   }
    //   this.setData({
    //     //导出动画到指定控件animation属性
    //     animation: attentionAnim.export()
    //   })
    // }.bind(this), 150)


    const token = wx.getStorageSync('token')
    wx.request({
      url: baseUrl + '/selectDrawtimesByuuid',
      data: {
        uuid: token
      },
      success: res => {
        console.log(res)
        this.setData({
          counters: res.data
        })
      }
    })
    //广播轮播
    wx.request({
      url: baseUrl + '/getPrizeMess',
      data: {
        uuid: token
      },
      success: res => {
        console.log(res.data)
        this.setData({
          zhong: res.data
        })
        console.log(this.data.zhong)
      }
    })
  },

  //发起抽奖
  start: function() {
    const token = wx.getStorageSync('token')
    wx.request({
      url: baseUrl + '/doDrawAndJudge',
      data: {
        uuid: token
      },
      success: res => {
        console.log(res)
        if (this.data.counters == 0) {
          wx.showModal({
            title: '抱歉',
            content: '没有次数了，请点击右上角···分享增加次数'
          })
          this.setData({
            disable: "none",
          })
        } else {
          this.setData({
            counters: res.data.drawtimes - 1,
            i: res.data.prize_id,
            record_id: res.data.record_id,
            drawstate: res.data.drawstate,
          })
          if (this.data.drawstate > 0) {
            console.log(this.data.counters)
            console.log("开始抽奖")
            setTimeout(function() {
              that.selectComponent(".lingjiang").openMask();
              that.setData({
                disable: '',
                // counters: res.data.drawtimes - 1
              })
            }, 4800)
            var awardIndex = 3;
            var runNum = 8; //旋转8周
            var duration = 4000; //时长

            // 旋转角度
            this.runDeg = this.runDeg || 0;
            this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / 12))
            //创建动画
            var animationRun = wx.createAnimation({
              duration: duration,
              timingFunction: 'ease'
            })
            animationRun.rotate(this.runDeg).step();
            this.setData({
              animationData: animationRun.export(),
              btnDisabled: 'disabled',
              i: 3
            });
          } else {
            console.log("开始抽奖")
            setTimeout(function() {
              that.selectComponent(".lingjiang").openMask();
              that.setData({
                disable: '',
              })
            }, 4800)
            console.log(that.data.i)
            var awardIndex = that.data.i;
            console.log(awardIndex);
            var runNum = 8; //旋转8周
            var duration = 4000; //时长

            // 旋转角度
            this.runDeg = this.runDeg || 0;
            this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / 12))
            //创建动画
            var animationRun = wx.createAnimation({
              duration: duration,
              timingFunction: 'ease'
            })
            animationRun.rotate(this.runDeg).step();
            this.setData({
              animationData: animationRun.export(),
              btnDisabled: 'disabled'
            });
          }
        }
      }
    })
    wx.request({
      url: baseUrl + '/getPrizeMess',
      data: {
        uuid: token
      },
      success: res => {
        console.log(res.data)
        this.setData({
          zhong: res.data
        })
        console.log(this.data.zhong)
      }
    })
    //中奖index
    var that = this;
    that.setData({
      disable: 'none',
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
      imageUrl: baseUrl + '/images/guoye/startover.jpg', //加载页图
    }
  },

  backClick() {
    wx.redirectTo({
      url: '../home/home',
    })
  }

})