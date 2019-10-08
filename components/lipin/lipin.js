const TOKEN = 'token'
Component({

  options: {
    multipleSlots: true
  },
  pageLifetimes: {
    show: function () {
      //页面被展示
      const token = wx.getStorageSync('token')
      wx.request({
        url: 'https://longmarch.innov-more.com/getMyPrizeRecord',
        data: {
          uuid: token
        },
        success: res => {
          console.log(res)
          this.setData({
            jiangpin: res.data,
           
          })
        }
      })

    }
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
    jiangpin: [],
    images: {
      closeIcon: '../../images/huodongshuoming/icon.png',
      title: '../../images/lipin/title.png',
      xian: '../../images/lipin/xian.png',
      kuang: '../../images/lipin/kuang.png'
    },
    isShowMask: false,
    hidden: false,
    duoqilai:false,
    record_id:'',
    clear:true,
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
    gai(e) {
      console.log(e.currentTarget.dataset.index);
      let index = e.currentTarget.dataset.index;
      if (this.data.jiangpin[index].prize == "幸运奖" && this.data.jiangpin[index].state == "0") {
        
        this.setData({
          hidden: true,
          record_id: this.data.jiangpin[index].record_id
        })

      } else if (this.data.jiangpin[index].prize == "一等奖" && this.data.jiangpin[index].state == "0") {

        wx.redirectTo({
          url: "../xinxi/xinxi?record_id=" + this.data.jiangpin[index].record_id + "&uuid=" + wx.getStorageSync('token'), //前去信息填写页面
        })
      } else if (this.data.jiangpin[index].prize == "二等奖" && this.data.jiangpin[index].state == "0") {

        wx.redirectTo({
          url: "../xinxi/xinxi?record_id=" + this.data.jiangpin[index].record_id + "&uuid=" + wx.getStorageSync('token'), //前去信息填写页面
        })
      } else if (this.data.jiangpin[index].prize == "三等奖" && this.data.jiangpin[index].state == "0") {

        wx.redirectTo({
          url: "../xinxi/xinxi?record_id=" + this.data.jiangpin[index].record_id + "&uuid=" + wx.getStorageSync('token'), //前去信息填写页面
        })
      }else{
        wx.redirectTo({
          url: '../receive/receive',
        })
      }
    },
    adInputChange: function (e) {
      console.log(e)
      let that = this;
      that.setData({
        value: e.detail.value,
      })

    },
    confirm() {

      //将该值传给后台
      const token = wx.getStorageSync('token')
      const phoneNumber = this.data.value
      const record_id = this.data.record_id
      console.log(token)
      console.log(phoneNumber)
      console.log(record_id)
      if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
        console.log("电话号码有误")
        return false;
      } else {
        wx.request({
          url: 'https://longmarch.innov-more.com/luckyPhoneNumber',
          data: {
            uuid: token,
            luckyNum: phoneNumber,
            id: record_id
          },
          success: res => {
            console.log('发送成功')
            this.setData({
              hidden: false,
              
              duoqilai:true,
            })
            
          }
        })

      }




    },
    zoukai(){
      this.setData({
        duoqilai: false,
      })
      const token = wx.getStorageSync('token')
      wx.redirectTo({
        url: '/pages/home/home',
      })
    },
    closeMask() {
      this.triggerEvent('parentEvent',{},{});
      console.log("aaaaaa")
      this.setData({
        isShowMask: false,
        
      })
      
    }
  }
})
