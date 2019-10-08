// pages/subject/subject.js
const app = getApp();
const baseUrl = app.globalData.baseUrl;
const TOKEN = 'token'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {
      bg: baseUrl + '/images/subject/bg.png',
      userImage: baseUrl + '/images/subject/touxiang.png',
      passDetail: baseUrl + '/images/subject/passdetail1.png',
      timeCircle: baseUrl + '/images/subject/timecircle.png',
      dui: baseUrl + '/images/subject/dui.png',
      cuo: baseUrl + '/images/subject/cuo.png',
      guan3: baseUrl + '/images/guoye/guan3.jpg'
    },
    audioTrue: baseUrl + '/images/audio/01.mp3',
    audioFalse: baseUrl + '/images/audio/02.mp3',
    // url: 'http://172.16.0.145:8080/question/',
    number: 1,
    obj: '',
    option1: 'default',
    option2: 'default',
    option3: 'default',
    option4: 'default',
    counter: 20,
    disable: '',
    index: 0,
    score: 0,
    challengeNum: 1,
    dui1: false,
    cuo1: false,
    dui2: false,
    cuo2: false,
    dui3: false,
    cuo3: false,
    dui4: false,
    cuo4: false,
    timer1: null,
    timer2: null,
    tag: null,
    chapter: '第一章',
    idShowGuoguan3: false
  },

  onReady: function() {
    this.audioCtx1 = wx.createAudioContext('myAudio1')
    this.audioCtx2 = wx.createAudioContext('myAudio2')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.challengeNum) {
      this.setData({
        challengeNum: options.challengeNum
      })
    }

    if (this.data.challengeNum == 2) {
      this.setData({
        chapter: '第二章',
        'images.passDetail': baseUrl + '/images/subject/passdetail2.png'
      })
    } else if (this.data.challengeNum == 3) {
      this.setData({
        chapter: '第三章',
        'images.passDetail': baseUrl + '/images/subject/passdetail3.png'
      })
    } else {
      this.setData({
        chapter: '第一章'
      })
    }


    this.timekeeper()

    this.getQuestions()

  },

  option1Click(e) {

    this.setData({
      disable: 'none'
    })

    const text = e.currentTarget.dataset.text
    const correct = this.data.obj[this.data.index].correct

    if (text == correct) {
      this.setData({
        option1: 'true',
        dui1: true,
        score: this.data.score + 1
      })

      this.audioCtx1.play()

      console.log(this.data.score)
    } else {
      this.setData({
        option1: 'false',
        cuo1: true
      })
      this.audioCtx2.play()

      this.showAnswer(correct)
    }


    this.delay()
  },

  option2Click(e) {
    this.setData({
      disable: 'none'
    })

    const text = e.currentTarget.dataset.text
    const correct = this.data.obj[this.data.index].correct

    if (text == correct) {
      this.setData({
        option2: 'true',
        dui2: true,
        score: this.data.score + 1

      })
      this.audioCtx1.play()

      console.log(this.data.score)
    } else {
      this.setData({
        option2: 'false',
        cuo2: true,
      })
      this.audioCtx2.play()

      this.showAnswer(correct)
    }


    this.delay()
  },

  option3Click(e) {
    this.setData({
      disable: 'none'
    })

    const text = e.currentTarget.dataset.text
    const correct = this.data.obj[this.data.index].correct

    if (text == correct) {
      this.setData({
        option3: 'true',
        dui3: true,
        score: this.data.score + 1
      })
      this.audioCtx1.play()

      console.log(this.data.score)
    } else {
      this.setData({
        option3: 'false',
        cuo3: true
      })
      this.audioCtx2.play()

      this.showAnswer(correct)
    }


    this.delay()
  },

  option4Click(e) {
    this.setData({
      disable: 'none'
    })

    const text = e.currentTarget.dataset.text
    const correct = this.data.obj[this.data.index].correct

    if (text == correct) {
      this.setData({
        option4: 'true',
        dui4: true,
        score: this.data.score + 1
      })
      this.audioCtx1.play()

      console.log(this.data.score)

    } else {
      this.setData({
        option4: 'false',
        cuo4: true
      })
      this.audioCtx2.play()

      this.showAnswer(correct)
    }


    this.delay()
  },

  // 计时器
  timekeeper() {
    this.data.timer1 = setInterval(() => {
      this.setData({
        counter: this.data.counter - 1
      })

      if (this.data.counter == 0) {
        clearInterval(this.data.timer1)

        this.showAnswer(this.data.obj[this.data.index].correct)

        if (this.data.index == 4) {
          clearInterval(this.data.timer1)
          setTimeout(() => {
            this.showResult()
          }, 1000)
        } else {
          setTimeout(() => {
            this.setData({
              index: this.data.index + 1,
              option1: 'default',
              option2: 'default',
              option3: 'default',
              option4: 'default',
              dui1: false,
              dui2: false,
              dui3: false,
              dui4: false,
              counter: 20
            })

            this.timekeeper()
          }, 2000)
        }
      }
    }, 1000)
  },

  // 点击后的延迟执行
  delay() {
    clearInterval(this.data.timer1)
    this.data.timer2 = setTimeout(() => {

      if (this.data.index == 4) {

        clearTimeout(this.data.timer2)



        clearInterval(this.data.timer1)
        this.showResult()

      } else {
        this.setData({
          index: this.data.index + 1,
          option1: 'default',
          option2: 'default',
          option3: 'default',
          option4: 'default',
          disable: '',
          dui1: false,
          cuo1: false,
          dui2: false,
          cuo2: false,
          dui3: false,
          cuo3: false,
          dui4: false,
          cuo4: false,
          counter: 20
        })


        this.timekeeper()

      }

    }, 2000)
  },

  showAnswer(answer) {
    switch (answer) {
      case this.data.obj[this.data.index].a:
        this.setData({
          option1: 'true',
          dui1: true
        })
        break;
      case this.data.obj[this.data.index].b:
        this.setData({
          option2: 'true',
          dui2: true
        })
        break;
      case this.data.obj[this.data.index].c:
        this.setData({
          option3: 'true',
          dui3: true
        })
        break;
      case this.data.obj[this.data.index].d:
        this.setData({
          option4: 'true',
          dui4: true
        })
        break;
        // default:
        //   this.setData({
        //     option4: 'true',
        //     dui4: true
        //   })
    }
  },



  // 获取题目数据
  getQuestions() {
    const token = wx.getStorageSync(TOKEN);
    wx.request({
      url: baseUrl + '/getQuestions',
      method: 'get',
      data: {
        uuid: token,
        challengeNum: this.data.challengeNum,
      },
      success: res => {
        console.log(res)
        this.setData({
          obj: res.data
        })
        console.log(this.data.obj)
      }
    })
  },

  // 保存分数及关卡
  updateScore() {
    const token = wx.getStorageSync(TOKEN)

    wx.request({
      url: baseUrl + '/updateScoreByChallengeNum',
      data: {
        uuid: token,
        challengeNum: this.data.challengeNum,
        score: this.data.score
      }
    })
  },

  // 显示闯关结果
  showResult() {
    if (this.data.challengeNum == 1) {
      if (this.data.score < 2) {
        this.setData({
          tag: 4
        })

      } else {
        this.setData({
          tag: 1
        })
      }

      this.updateScore()

      this.selectComponent('.tongguan').openMask()

      this.clearScore()

    } else if (this.data.challengeNum == 2) {
      if (this.data.score < 3) {
        this.setData({
          tag: 4
        })

      } else {
        this.setData({
          tag: 2
        })
      }

      this.updateScore()

      this.selectComponent('.tongguan').openMask()

      this.clearScore()

    } else {
      if (this.data.score < 4) {
        this.setData({
          tag: 4
        })

      } else {
        const token = wx.getStorageSync('token')
        wx.request({
          url: baseUrl + '/addDrawtimes',
          data: {
            uuid: token,
          },
          success: res => {
            console.log("闯关成功")
          }
        })
        this.setData({
          tag: 3
        })

      }

      this.setData({
        idShowGuoguan3: true
      })



      this.updateScore()

      setTimeout(() => {
        this.setData({
          idShowGuoguan3: false
        })
        this.selectComponent('.tongguan').openMask()
      }, 3000)


      this.clearScore()
    }
  },

  // 分数清零
  clearScore() {
    this.setData({
      score: 0
    })
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

  }
})